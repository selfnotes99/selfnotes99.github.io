"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { products } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountAwayFromFreeShipping: number;
  lastAddedProduct: Product | null;
  showToast: boolean;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial 3 items to match the badge '3' from the reference screenshot
const INITIAL_DEMO_ITEMS: CartItem[] = [
  {
    id: "prod-1-default",
    product: products[0], // Urban Backpack ($49.99)
    quantity: 1,
    selectedColor: "Olive Green",
    selectedSize: "One Size",
  },
  {
    id: "prod-2-default",
    product: products[1], // Essential Hoodie ($39.99)
    quantity: 1,
    selectedColor: "Forest Green",
    selectedSize: "M",
  },
  {
    id: "prod-3-default",
    product: products[2], // Premium Sneakers ($59.99)
    quantity: 1,
    selectedColor: "Crisp White / Green",
    selectedSize: "US 9",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_DEMO_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shopifyretail_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("shopifyretail_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isHydrated]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize = product.sizes?.[0] || "Standard",
    selectedColor = product.colors?.[0]?.name || "Default"
  ) => {
    const itemKey = `${product.id}-${selectedSize}-${selectedColor}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          quantity,
          selectedSize,
          selectedColor,
        },
      ];
    });

    setLastAddedProduct(product);
    setShowToast(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 50;
  const amountAwayFromFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        subtotal,
        freeShippingThreshold,
        amountAwayFromFreeShipping,
        lastAddedProduct,
        showToast,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
