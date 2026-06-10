"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
}

interface EditCategoryFormProps {
  category: Category;
}

export default function EditCategoryForm({
  category,
}: EditCategoryFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(category.name);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");

    const { error } = await supabase
      .from("categories")
      .update({
        name,
      })
      .eq("id", category.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Category Name
        </label>

        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
        />
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700"
      >
        Save Changes
      </button>
    </form>
  );
}