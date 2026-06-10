import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/products";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Products
            </h1>
            <p className="mt-2 text-gray-600">
              Manage bakery products.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-full bg-pink-600 px-6 py-3 text-center font-semibold text-white hover:bg-pink-700"
          >
            Add Product
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-pink-50 text-sm text-gray-700">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Available</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-pink-100">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-gray-900">
                      {product.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {product.category}
                    </td>

                    <td className="p-4 font-semibold text-pink-600">
                      {product.price.toFixed(3)} TND
                    </td>

                    <td className="p-4">
                      {product.featured ? "Yes" : "No"}
                    </td>

                    <td className="p-4">
                      {product.isAvailable ? "Yes" : "No"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                        >
                          Edit
                        </Link>

                        <DeleteProductButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}