"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-[#F3E7E2] bg-[#FFF8F4]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Fyanka Bakery"
            width={180}
            height={180}
            className="h-20 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/products"
            className="font-medium text-[#3A2A2A] transition hover:text-[#B97A95]"
          >
            Products
          </Link>

          <Link
            href="/cart"
            className="rounded-full bg-[#B97A95] px-5 py-2.5 font-medium text-white transition hover:bg-[#A86C86]"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </nav>
    </header>
  );
}
