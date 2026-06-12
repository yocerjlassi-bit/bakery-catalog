import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-[#F3E7E2] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden bg-[#FFF8F4]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-sm font-medium uppercase tracking-wider text-[#B97A95]">
          {product.category}
        </p>

        <h3 className="mt-3 text-2xl font-semibold text-[#3A2A2A]">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xl font-bold text-[#C9A05A]">
            {product.price.toFixed(3)} TND
          </span>

          <Link
            href={`/products/${product.id}`}
            className="rounded-full border border-[#D7A8A0] bg-[#FFF8F4] px-5 py-2 text-sm font-semibold text-[#B97A95] transition hover:bg-[#D7A8A0] hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}