import { CartItem } from "@/store/cartStore";
import { CheckoutFormData } from "@/types/checkout";
import { supabase } from "@/lib/supabase";

export async function createOrder(
  items: CartItem[],
  checkoutData: CheckoutFormData
) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: checkoutData.customerName,
      phone_number: checkoutData.phoneNumber,
      email: checkoutData.email || null,
      order_type: checkoutData.orderType,
      delivery_address:
        checkoutData.orderType === "delivery"
          ? checkoutData.deliveryAddress
          : null,
      requested_date: checkoutData.requestedDate,
      time_slot: checkoutData.timeSlot,
      notes: checkoutData.notes || null,
      total,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { orderId: null, error: orderError };
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    return { orderId: order.id, error: itemsError };
  }

  return { orderId: order.id, error: null };
}
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
    const { count } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      });
  
    return count ?? 0;
  }