"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-8 w-full rounded-full bg-pink-600 px-8 py-4 font-semibold text-white transition hover:bg-pink-700 md:w-fit"
    >
      Add to Cart
    </button>
  );
}