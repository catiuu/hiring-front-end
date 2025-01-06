import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  removeAllFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    if (Array.isArray(cartItems)) {
      const foundItem = cartItems.find((item) => item.id === id);
      return foundItem ? foundItem.quantity : 0;
    }

    return 0;
  }

  function addItem(id: number) {
    setCartItems((prevItems) => {
      if (Array.isArray(prevItems)) {
        const existingItem = prevItems.find((item) => item.id === id);
        if (!existingItem) {
          return [...prevItems, { id, quantity: 1 }];
        } else {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
      }

      return prevItems;
    });
  }

  function removeItem(id: number) {
    setCartItems((prevItems) => {
      if (Array.isArray(prevItems)) {
        const existingItem = prevItems.find((item) => item.id === id);
        if (existingItem && existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevItems.filter((item) => item.id !== id);
        }
      }

      return prevItems;
    });
  }

  function removeAllFromCart(id: number) {
    setCartItems((prevItems) => {
      if (Array.isArray(prevItems)) {
        return prevItems.filter((item) => item.id !== id);
      }

      return prevItems;
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        addItem,
        removeItem,
        removeAllFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
