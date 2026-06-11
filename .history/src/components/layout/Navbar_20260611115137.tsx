"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const supabase = createClient();

  const [businessName, setBusinessName] = useState("Sweet Bakery");

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("settings")
        .select("business_name")
        .limit(1)
        .single();

      if (data?.business_name) {
        setBusinessName(data.business_name);
      }
    }

    fetchSettings();
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          
        >
          {businessName}
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