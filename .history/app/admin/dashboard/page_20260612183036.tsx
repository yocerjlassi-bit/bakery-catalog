import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  getProductsCount,
  getCategoriesCount,
  getFeaturedProductsCount,
  getAvailableProductsCount,
} from "@/lib/products";
import { getOrdersCount, getPendingOrdersCount } from "@/lib/orders-server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const productsCount = await getProductsCount();
  const categoriesCount = await getCategoriesCount();
  const featuredProductsCount = await getFeaturedProductsCount();
  const availableProductsCount = await getAvailableProductsCount();
  const ordersCount = await getOrdersCount();
  const pendingOrdersCount = await getPendingOrdersCount();

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#B97A95]">
              Bakery Admin
            </p>

            <h1 className="text-5xl font-bold text-[#3A2A2A]">Dashboard</h1>

            <p className="mt-3 text-gray-600">Logged in as {user.email}</p>
          </div>

          <LogoutButton />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/products"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Products
            </p>
            <p className="mt-3 text-5xl font-bold text-[#B97A95]">
              {productsCount}
            </p>
            <p className="mt-3 text-gray-600">Manage bakery products.</p>
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Categories
            </p>
            <p className="mt-3 text-5xl font-bold text-[#B97A95]">
              {categoriesCount}
            </p>
            <p className="mt-3 text-gray-600">Manage product categories.</p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Orders
            </p>
            <p className="mt-3 text-5xl font-bold text-[#B97A95]">
              {ordersCount}
            </p>
            <p className="mt-3 text-gray-600">View customer orders.</p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Pending Orders
            </p>
            <p className="mt-3 text-5xl font-bold text-[#B97A95]">
              {pendingOrdersCount}
            </p>
            <p className="mt-3 text-gray-600">Orders waiting for action.</p>
          </Link>

          <Link
            href="/admin/products"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Featured Products
            </p>
            <p className="mt-3 text-5xl font-bold text-[#B97A95]">
              {featuredProductsCount}
            </p>
            <p className="mt-3 text-gray-600">Homepage featured items.</p>
          </Link>

          <Link
            href="/admin/products"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Available Products
            </p>
            <p className="mt-3 text-5xl font-bold text-[#B97A95]">
              {availableProductsCount}
            </p>
            <p className="mt-3 text-gray-600">Products visible to clients.</p>
          </Link>

          <Link
            href="/admin/settings"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:col-span-3"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Settings
            </p>
            <p className="mt-3 text-4xl font-bold text-[#B97A95]">
              Business Info
            </p>
            <p className="mt-3 text-gray-600">
              Manage business name, WhatsApp number, Instagram, address, and
              opening hours.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
