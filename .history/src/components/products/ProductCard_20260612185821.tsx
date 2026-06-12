import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="relative h-56 overflow-hidden bg-pink-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-pink-600">{product.category}</p>

        <h3 className="mt-2 text-xl font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-gray-600">{product.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-bold ">
            {product.price.toFixed(3)} TND
          </span>

          <Link
            href={`/products/${product.id}`}
            className="rounded-full bg-[#B97A95] px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
