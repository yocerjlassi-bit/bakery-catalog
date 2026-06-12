import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-[#F7C8D0]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 h-[2px] w-12 rounded-full bg-[#C9A05A]" />

        <p className="text-sm uppercase tracking-[0.2em] text-[#B97A95]">
          {product.category}
        </p>

        <h3 className="mt-3 text-3xl font-semibold text-[#3A2A2A] [font-family:var(--font-playfair)]">
          {product.name}
        </h3>

        <p className="mt-3 text-gray-600">{product.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#C9A05A]">
            {product.price.toFixed(3)} TND
          </span>

          <Link
            href={`/products/${product.id}`}
            className="rounded-full border border-[#D7A8A0] px-6 py-2 font-medium text-[#B97A95] transition hover:bg-[#B97A95] hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
