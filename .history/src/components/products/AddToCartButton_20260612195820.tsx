"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-full bg-[#B97A95] px-6 py-3 font-semibold text-white transition hover:bg-[#A86C86]"
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}