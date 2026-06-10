import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/products";
import NewProductForm from "@/components/admin/NewProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900">
          Add Product
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new bakery product.
        </p>

        <NewProductForm categories={categories} />
      </section>
    </main>
  );
}