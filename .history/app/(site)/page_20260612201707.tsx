import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { getBusinessSettings } from "@/lib/settings";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const businessSettings = await getBusinessSettings();

  return (
    <main className="min-h-screen bg-[#FFF8F4]">
      <section className="relative overflow-hidden bg-[#FFF8F4] px-6 py-24">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[#F7C8D0]/40 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[#CFE8D5]/50 blur-3xl" />
        <div className="absolute right-1/3 top-24 h-32 w-32 rounded-full bg-[#DCC9F2]/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#C9A05A]">
              Handmade Bakery
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-[#3A2A2A] md:text-7xl [font-family:var(--font-playfair)]">
              Soft, elegant sweets for your sweetest moments.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover cakes, pastries and sweet creations made with care, soft
              colors, and a touch of elegance.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="rounded-full bg-[#B97A95] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#A86C86]"
              >
                View Catalog
              </Link>

              <a
                href={`https://wa.me/${businessSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#D7A8A0] bg-white px-8 py-4 text-center font-semibold text-[#B97A95] transition hover:bg-[#FFF0F5]"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#F3E7E2] bg-white/80 p-4 shadow-sm">
            <div className="flex min-h-[460px] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#FFF8F4] via-[#FFF0F5] to-[#F1F7EF] text-center">
              <div>
                <img
                  src="/logo.png"
                  alt="Fyanka Bakery"
                  className="mx-auto h-52 w-auto object-contain"
                />

                <p className="mt-6 text-sm uppercase tracking-[0.4em] text-[#C9A05A]">
                  Fresh • Soft • Handmade
                </p>
              </div>
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
