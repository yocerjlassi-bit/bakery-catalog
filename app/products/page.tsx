import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="mt-3 text-gray-600">
            Choose your favorite bakery products and order through WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}