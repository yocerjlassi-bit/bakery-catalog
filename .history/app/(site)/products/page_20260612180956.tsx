"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import ProductSearch from "@/components/products/ProductSearch";
import { Product } from "@/types/product";

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch && product.isAvailable;
  });

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B97A95]">
            Our Menu
          </p>

          <h1 className="text-5xl font-bold text-[#3A2A2A]">Bakery Catalog</h1>

          <p className="mt-3 text-gray-600">
            Choose your favorite bakery products and order through WhatsApp.
          </p>
        </div>

        <ProductSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid gap-8 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
