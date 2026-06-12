"use client";
 import Link from "next/link"; 
 import { useEffect, useState } from "react"; 
 import { useCartStore } from "@/store/cartStore"; 
 import { createClient } from "@/lib/supabase/client"; 
 export default function Navbar() { const items = useCartStore((state) => state.items);
   const supabase = createClient();
    const [businessName, setBusinessName] = useState("Sweet Bakery");
     const totalItems = items.reduce( (sum, item) => sum + item.quantity, 0 ); 
     useEffect(() => { async function fetchSettings()
       { const { data } = await supabase .from("settings") .select("business_name") .limit(1) .single(); 
     if (data?.business_name) { setBusinessName(data.business_name); } } fetchSettings(); }, [supabase]);
return (
  <header className="sticky top-0 z-50 border-b border-[#F3DDE6] bg-[#FFF8F4]/95 backdrop-blur">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="text-4xl font-bold tracking-wide text-[#B97A95] [font-family:var(--font-playfair)]"
      >
        {businessName}
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