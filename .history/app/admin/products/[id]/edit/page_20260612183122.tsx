import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategories, getProductById } from "@/lib/products";
import EditProductForm from "@/components/admin/EditProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const product = await getProductById(id);
  const categories = await getCategories();

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900">Edit Product</h1>

        <p className="mt-2 text-gray-600">Update product information.</p>

        <EditProductForm product={product} categories={categories} />
      </section>
    </main>
  );
}
