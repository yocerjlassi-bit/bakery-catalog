"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export default function DeleteCategoryButton({
  categoryId,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600"
    >
      Delete
    </button>
  );
}