import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAllCategories } from "@/lib/products";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Categories
            </h1>

            <p className="mt-2 text-gray-600">
              Manage bakery categories.
            </p>
          </div>

          <Link
            href="/admin/categories/new"
            className="rounded-full bg-pink-600 px-6 py-3 font-semibold text-white"
          >
            Add Category
          </Link>
        </div>

        <div className="rounded-3xl bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b">
                  <td className="p-4">{category.name}</td>

                  <td className="p-4">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}