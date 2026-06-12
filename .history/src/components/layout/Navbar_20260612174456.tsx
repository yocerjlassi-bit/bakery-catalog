return (
  <header className="sticky top-0 z-50 border-b border-[#F1E4D4] bg-[#FFF8F4]/95 backdrop-blur">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="text-4xl font-bold tracking-wide text-[#2B1810] [font-family:var(--font-playfair)]"
      >
        {businessName}
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="/products"
          className="font-medium text-[#2B1810] transition hover:text-[#B8894D]"
        >
          Products
        </Link>

        <Link
          href="/cart"
          className="rounded-full bg-[#B8894D] px-5 py-2.5 font-medium text-white transition hover:bg-[#9F743F]"
        >
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  </header>
);