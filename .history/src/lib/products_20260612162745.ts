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
  categories:
  | {
      name: string;
    }
  | {
      name: string;
    }[]
  | null;
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
export async function getFeaturedProducts(): Promise<Product[]> {
    const products = await getProducts();
  
    return products.filter((product) => product.featured);
  }
  export async function deleteProduct(productId: string) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
  
    return { error };
  }
  export async function getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name", { ascending: true });
  
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  
    return data;
  }
  export async function getProductById(productId: string): Promise<Product | null> {
    const products = await getProducts();
  
    return products.find((product) => product.id === productId) || null;
  }
  export async function getAllCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
  
    if (error) {
      console.error(error);
      return [];
    }
  
    return data;
  }
  
  export async function getCategoryById(id: string) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
  
    if (error) {
      return null;
    }
  
    return data;
  }
  export async function getProductsCount() {
    const { count } = await supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      });
  
    return count ?? 0;
  }
  
  export async function getCategoriesCount() {
    const { count } = await supabase
      .from("categories")
      .select("*", {
        count: "exact",
        head: true,
      });
  
    return count ?? 0;
  }
  
  export async function getFeaturedProductsCount() {
    const { count } = await supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("featured", true);
  
    return count ?? 0;
  }
  export async function getAvailableProductsCount() {
    const { count } = await supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("is_available", true);
  
    return count ?? 0;
  }