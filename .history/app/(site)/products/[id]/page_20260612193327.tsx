import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product || !product.isAvailable) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto grid max-w-6xl gap-10 rounded-[32px] bg-white p-8 shadow-sm lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#FFF8F4]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B97A95]">
            {product.category}
          </p>

          <h1 className="mt-4 text-5xl font-bold text-[#3A2A2A]">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {product.description}
          </p>

          <p className="mt-8 text-3xl font-bold text-[#C9A05A]">
            {product.price.toFixed(3)} TND
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/products"
              className="rounded-full border border-[#D7A8A0] px-6 py-3 font-semibold text-[#B97A95]"
            >
              Back to Catalog
            </Link>

            <Link
              href="/cart"
              className="rounded-full bg-[#B97A95] px-6 py-3 font-semibold text-white hover:bg-[#A86C86]"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}