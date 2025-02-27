import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// AWS Amplify configuration
import { Amplify } from 'aws-amplify';
import awsExports from "./aws-exports";


// Pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookDetails from "./pages/BookDetails";
import Admin from "./pages/Admin";

// Components
import Header  from "./components/Header";

Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      {/* Header remains persistent across all pages */}
      <Header />
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/admin" element={<Admin />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
