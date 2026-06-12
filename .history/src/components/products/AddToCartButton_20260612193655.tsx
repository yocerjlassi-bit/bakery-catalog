"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="rounded-full bg-[#B97A95] px-6 py-3 font-semibold text-white transition hover:bg-[#A86C86]"
    >
      Add to Cart
    </button>
  );
}