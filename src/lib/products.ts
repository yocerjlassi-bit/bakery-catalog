import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

type SupabaseProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  featured: boolean;
  categories: {
    name: string;
  } | null;
};

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      description,
      price,
      image_url,
      is_available,
      featured,
      categories (
        name
      )
    `
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data as SupabaseProduct[]).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description || "",
    price: Number(product.price),
    imageUrl: product.image_url || "",
    category: product.categories?.name || "Uncategorized",
    isAvailable: product.is_available,
    featured: product.featured,
  }));
}