"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
}

interface NewProductFormProps {
  categories: Category[];
}

export default function NewProductForm({
  categories,
}: NewProductFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [isAvailable, setIsAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.from("products").insert({
      name,
      description,
      price: Number(price),
      image_url: imageUrl,
      category_id: categoryId,
      is_available: isAvailable,
      featured,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Product Name *
        </label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
          placeholder="Chocolate Cake"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
          placeholder="Short product description"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Price *
        </label>
        <input
          required
          type="number"
          step="0.001"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
          placeholder="45.000"
        />
      </div>

      <div>
  <label className="mb-2 block font-medium text-gray-900">
    Product Image *
  </label>

  <input
    required
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.target.files?.[0];
      if (file) {
        setImageFile(file);
      }
    }}
    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
  />
</div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Category *
        </label>
        <select
          required
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(event) => setIsAvailable(event.target.checked)}
        />
        <span>Available</span>
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event) => setFeatured(event.target.checked)}
        />
        <span>Featured on homepage</span>
      </label>

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700"
      >
        Save Product
      </button>
    </form>
  );
}