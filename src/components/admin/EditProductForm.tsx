"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";

interface Category {
  id: string;
  name: string;
}

interface EditProductFormProps {
  product: Product;
  categories: Category[];
}

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(String(product.price));
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [categoryId, setCategoryId] = useState(
    categories.find((category) => category.name === product.category)?.id || ""
  );
  const [isAvailable, setIsAvailable] = useState(product.isAvailable);
  const [featured, setFeatured] = useState(product.featured);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const { error } = await supabase
      .from("products")
      .update({
        name,
        description,
        price: Number(price),
        image_url: imageUrl,
        category_id: categoryId,
        is_available: isAvailable,
        featured,
      })
      .eq("id", product.id);

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
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Image URL *
        </label>
        <input
          required
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
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
        Save Changes
      </button>
    </form>
  );
}