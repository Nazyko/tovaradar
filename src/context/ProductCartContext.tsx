import { createContext, ReactNode, useContext, useMemo } from "react";
import { useLocalstorage } from "../hooks/useLocalstorage";

type ProductsCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartContext = {
  increaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ProductsCartContext = createContext({} as CartContext);

export const useProductsCart = () => {
  return useContext(ProductsCartContext);
};

export const ProductsCartProvider = ({ children }: ProductsCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalstorage<CartItem[]>("cart-products", []);

  const cartQuantity = useMemo(
    () => cartItems.reduce((quantity, item) => item.quantity + quantity, 0),
    [cartItems]
  );

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({
      increaseCartQuantity,
      removeFromCart,
      cartItems,
      cartQuantity,
    }),
    [cartItems, cartQuantity]
  );

  return (
    <ProductsCartContext.Provider value={value}>
      {children}
    </ProductsCartContext.Provider>
  );
};
