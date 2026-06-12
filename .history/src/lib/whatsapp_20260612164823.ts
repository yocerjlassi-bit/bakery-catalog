import { CartItem } from "@/store/cartStore";
import { CheckoutFormData } from "@/types/checkout";
export function generateWhatsAppOrderUrl(
    items: CartItem[],
    checkoutData: CheckoutFormData,
    whatsappNumber: string
  ) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderLines = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} - ${(
          item.price * item.quantity
        ).toFixed(3)} TND`
    )
    .join("\n");

  const message = `🍰 New Bakery Order

Customer:
Name: ${checkoutData.customerName}
Phone: ${checkoutData.phoneNumber}
Email: ${checkoutData.email || "Not provided"}

Order Type: ${checkoutData.orderType}
${
  checkoutData.orderType === "delivery"
    ? `Delivery Address: ${checkoutData.deliveryAddress}`
    : ""
}

Requested Date: ${checkoutData.requestedDate}
Time Slot: ${checkoutData.timeSlot}

Order:
${orderLines}

Total: ${total.toFixed(3)} TND

Notes:
${checkoutData.notes || "No notes"}

Please confirm availability and details.`;

return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}