import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategoryById } from "@/lib/products";
import EditCategoryForm from "@/components/admin/EditCategoryForm";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900">
          Edit Category
        </h1>

        <p className="mt-2 text-gray-600">
          Update category information.
        </p>

        <EditCategoryForm category={category} />
      </section>
    </main>
  );
}