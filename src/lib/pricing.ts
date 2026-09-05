import type { CartItem, Coupon } from "@/types";

export function cartSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function applyCoupon(subtotal: number, coupon: Coupon | undefined) {
  if (!coupon || !coupon.active || subtotal < coupon.minSpend) {
    return { discount: 0, total: subtotal };
  }
  const discount = Math.round((subtotal * coupon.percentOff) / 100);
  return { discount, total: Math.max(subtotal - discount, 0) };
}

export function computeTotal(basePrice: number, cart: CartItem[], coupon?: Coupon) {
  const subtotal = basePrice + cartSubtotal(cart);
  const { discount, total } = applyCoupon(subtotal, coupon);
  return { subtotal, discount, total };
}
