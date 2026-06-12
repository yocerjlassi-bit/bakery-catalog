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