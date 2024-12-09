import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a Product and CartItem
interface Product {
  imageUrl: string;
  id: number;
  name: string;
  price: number;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Define the context's state structure
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

// Create the CartContext with a default value (empty cart)
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (itemIndex >= 0) {
        // If product exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += quantity;
        return updatedCart;
      }
      // If product does not exist, add new item
      return [...prevCart, { product, quantity }];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
