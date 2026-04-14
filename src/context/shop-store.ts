import { createContext, useContext } from "react";

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface ShopContextValue {
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

export const FAVORITES_STORAGE_KEY = "shop:favorites";
export const CART_STORAGE_KEY = "shop:cart";

export const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const readStorage = <T,>(key: "favorites" | "cart", fallback: T) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const storageKey = key === "favorites" ? FAVORITES_STORAGE_KEY : CART_STORAGE_KEY;

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
};
