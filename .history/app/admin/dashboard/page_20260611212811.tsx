import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  getProductsCount,
  getCategoriesCount,
  getFeaturedProductsCount,
} from "@/lib/products";
export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-gray-600">
              Logged in as {user.email}
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/products"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-bold">Products</h2>
            <p className="mt-2 text-gray-600">Manage bakery products.</p>
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-bold">Categories</h2>
            <p className="mt-2 text-gray-600">Manage product categories.</p>
          </Link>

          <Link
            href="/admin/settings"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="mt-2 text-gray-600">Manage business information.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}