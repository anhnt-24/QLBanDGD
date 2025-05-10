// CartContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (id: string) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
