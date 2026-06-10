import { supabase } from "@/lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    return (
      <main className="p-10">
        <h1>Supabase Error</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Supabase Categories</h1>

      <ul className="mt-6 space-y-2">
        {data?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </main>
  );
}