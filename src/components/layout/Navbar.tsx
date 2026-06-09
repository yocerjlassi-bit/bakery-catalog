"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-pink-600"
        >
          Sweet Bakery
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="rounded-full bg-pink-600 px-4 py-2 font-medium text-white"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </nav>
    </header>
  );
}