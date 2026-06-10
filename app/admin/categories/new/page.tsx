import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NewCategoryForm from "@/components/admin/NewCategoryForm";

export default async function NewCategoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900">
          Add Category
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new category.
        </p>

        <NewCategoryForm />
      </section>
    </main>
  );
}