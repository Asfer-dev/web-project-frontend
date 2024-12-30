import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getProductIds(product_items) {
  return product_items.flatMap(({ productId, quantity }) =>
    Array(quantity).fill(productId)
  );
}
