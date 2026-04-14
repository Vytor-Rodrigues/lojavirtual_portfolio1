import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  CART_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  ShopContext,
  readStorage,
  type CartItem,
  type ShopContextValue,
} from "./shop-store";

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => readStorage("favorites", []));
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readStorage("cart", []));

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
