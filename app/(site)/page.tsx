import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { getBusinessSettings } from "@/lib/settings";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const businessSettings = await getBusinessSettings();

  return (
    <main className="min-h-screen bg-[#FFF8F4]">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#B8894D]">
            Luxury Bakery
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight text-[#2B1810] md:text-7xl">
            Elegant cakes and pastries for your sweetest moments.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Discover handcrafted bakery creations, choose your favorites, and
            place your order directly through WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-[#2B1810] px-8 py-4 text-center font-semibold text-white hover:bg-[#3A2419]"
            >
              Explore Products
            </Link>

            <a
              href={`https://wa.me/${businessSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#B8894D] px-8 py-4 text-center font-semibold text-[#2B1810] hover:bg-[#F6E8D8]"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-sm">
          <div className="flex min-h-[480px] items-center justify-center rounded-[1.5rem] bg-[#F6E8D8] text-center">
            <div>
              <p className="text-8xl">🍰</p>
              <p className="mt-6 text-2xl font-semibold text-[#2B1810]">
                {businessSettings.businessName}
              </p>
              <p className="mt-2 text-[#B8894D]">
                Fresh • Elegant • Handmade
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#B8894D]">
            Selected Products
          </p>

          <h2 className="text-4xl font-bold text-[#2B1810]">
            Featured Creations
          </h2>

          <p className="mt-3 text-gray-600">
            A curated selection of our most loved bakery products.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-block rounded-full bg-[#B8894D] px-8 py-4 font-semibold text-white hover:bg-[#9F743F]"
          >
            View Full Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}