import React from 'react';
import ReactDOM from 'react-dom/client';
import { BookProvider } from "./context/books";
import { CartProvider } from "./context/cart";
import App from './App';
import './index.css';

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BookProvider>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>
  </BookProvider>
);
