import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { v4 as uuidv4 } from "uuid";
import { listBooks } from "../api/queries";
import { processOrder } from "../api/mutations";
import { fetchAuthSession } from "aws-amplify/auth";

const client = generateClient();
const BookContext = React.createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handles the checkout process by sending order details to the backend
  const checkout = async (orderDetails) => {
    try {
      const { accessToken } = (await fetchAuthSession()).tokens ?? {};
      if (!accessToken) {
        throw new Error("User is not authenticated.");
      }
      
      const payload = {
        id: uuidv4(),
        ...orderDetails
      };

      await client.graphql({
        query: processOrder,
        variables: { input: payload },
        authMode: "AMAZON_COGNITO_USER_POOLS",
        authToken: accessToken.toString()
      });
      console.log("Order is successful");
    } catch (err) {
      console.log("Error processing order:", err);
    }
  };

  // Fetch books from the API and update state
  const fetchBooks = async () => {
    try {
      setLoading(true);
      
      let authMode = "API_KEY"; // Default to guest mode
      let authToken = null;
      
      try {
        // Try fetching the auth session (only works if user is signed in)
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        if (accessToken) {
          authMode = "AMAZON_COGNITO_USER_POOLS";
          authToken = accessToken.toString();
        }
      } catch (error) {
        console.log("Guest user detected, using API key.");
      }
      
      const { data } = await client.graphql({
        query: listBooks,
        authMode: authMode,
        ...(authToken ? { authToken } : {})
      });
      
      const books = data.listBooks.items;
      const featured = books.filter((book) => !!book.featured);
      setBooks(books);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  return (
    <BookContext.Provider value={{ books, featured, loading, checkout }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
