import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartButton from "@/components/cart/AddToCartButton";
interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">
        <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-pink-100 text-8xl">
          🎂
        </div>

        <div className="flex flex-col justify-center">
          <Link href="/products" className="mb-6 text-sm text-pink-600">
            ← Back to products
          </Link>

          <p className="text-sm font-medium text-pink-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            {product.description}
          </p>

          <p className="mt-6 text-3xl font-bold text-pink-600">
            {product.price.toFixed(3)} TND
          </p>

          <AddToCartButton product={product} />
        </div>
      </section>
    </main>
  );
}