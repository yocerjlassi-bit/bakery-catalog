import { createClient } from "@/lib/supabase/server";

export type AdminOrder = {
  id: string;
  customer_name: string;
  phone_number: string;
  email: string | null;
  order_type: string;
  delivery_address: string | null;
  requested_date: string;
  time_slot: string;
  notes: string | null;
  total: number;
  status: string;
  created_at: string;
};

export async function getOrders(): Promise<AdminOrder[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data as AdminOrder[];
}

export async function getOrdersCount() {
  const supabase = await createClient();

  const { count } = await supabase
    .from("orders")
    .select("*", {
      count: "exact",
      head: true,
    });

  return count ?? 0;
}