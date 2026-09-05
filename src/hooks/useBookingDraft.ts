"use client";

import { useCallback, useState } from "react";
import type { BookingDraft, CartItem } from "@/types";

const initialDraft: BookingDraft = { cart: [] };

export function useBookingDraft() {
  const [draft, setDraft] = useState<BookingDraft>(initialDraft);

  const toggleCartItem = useCallback((item: CartItem) => {
    setDraft((prev) => {
      const exists = prev.cart.some(
        (cartItem) =>
          cartItem.addOnId === item.addOnId &&
          cartItem.optionName === item.optionName
      );

      if (exists) {
        return {
          ...prev,
          cart: prev.cart.filter(
            (cartItem) =>
              !(
                cartItem.addOnId === item.addOnId &&
                cartItem.optionName === item.optionName
              )
          ),
        };
      }

      return {
        ...prev,
        cart: [...prev.cart, item],
      };
    });
  }, []);

  const update = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const removeCartItem = useCallback(
    (addOnId: string, optionName: string) => {
      setDraft((prev) => ({
        ...prev,
        cart: prev.cart.filter(
          (c) =>
            !(c.addOnId === addOnId && c.optionName === optionName)
        ),
      }));
    },
    []
  );

  return {
    draft,
    update,
    removeCartItem,
    toggleCartItem,
  };
}