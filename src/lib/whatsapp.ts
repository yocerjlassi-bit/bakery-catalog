import { CartItem } from "@/store/cartStore";

const BUSINESS_WHATSAPP_NUMBER = "58701415";

export function generateWhatsAppOrderUrl(items: CartItem[]) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderLines = items
    .map(
      (item) =>
        `- ${item.quantity}x ${item.name} (${(
          item.price * item.quantity
        ).toFixed(3)} TND)`
    )
    .join("\n");

  const message = `Hello, I would like to place an order:

${orderLines}

Total: ${total.toFixed(3)} TND

Please confirm availability and details.`;

  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}