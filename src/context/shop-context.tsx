import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface ShopContextValue {
  favoriteIds: number[];
  cartItems: CartItem[];
  favoriteCount: number;
  cartCount: number;
  isFavorite: (productId: number) => boolean;
  getCartQuantity: (productId: number) => number;
  toggleFavorite: (productId: number) => boolean;
  addToCart: (productId: number, quantity?: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const FAVORITES_STORAGE_KEY = "shop:favorites";
const CART_STORAGE_KEY = "shop:cart";

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

const readStorage = <T,>(key: string, fallback: T) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => readStorage(FAVORITES_STORAGE_KEY, []));
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readStorage(CART_STORAGE_KEY, []));

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo<ShopContextValue>(() => ({
    favoriteIds,
    cartItems,
    favoriteCount: favoriteIds.length,
    cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    isFavorite: (productId) => favoriteIds.includes(productId),
    getCartQuantity: (productId) => cartItems.find((item) => item.productId === productId)?.quantity ?? 0,
    toggleFavorite: (productId) => {
      const willAdd = !favoriteIds.includes(productId);
      setFavoriteIds((prev) => (
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      ));
      return willAdd;
    },
    addToCart: (productId, quantity = 1) => {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.productId === productId);

        if (existingItem) {
          return prev.map((item) => (
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ));
        }

        return [...prev, { productId, quantity }];
      });
    },
    updateCartQuantity: (productId, quantity) => {
      setCartItems((prev) => (
        quantity <= 0
          ? prev.filter((item) => item.productId !== productId)
          : prev.map((item) => (
              item.productId === productId ? { ...item, quantity } : item
            ))
      ));
    },
    removeFromCart: (productId) => {
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    },
  }), [cartItems, favoriteIds]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
};
