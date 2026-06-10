"use client";
import { businessSettings } from "@/data/settings";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CheckoutFormData } from "@/types/checkout";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    phoneNumber: "",
    email: "",
    orderType: "pickup",
    deliveryAddress: "",
    requestedDate: "",
    timeSlot: "",
    notes: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function updateField(
    field: keyof CheckoutFormData,
    value: string
  ) {
    setFormData((previousData) => ({
      ...previousData,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const whatsappUrl = generateWhatsAppOrderUrl(items, formData);
  
    window.open(whatsappUrl, "_blank");
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-4 text-gray-600">
            Your cart is empty. Please add products before checkout.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Browse Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mb-8 text-gray-600">
            Fill in your order details before continuing to WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(event) =>
                  updateField("customerName", event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
                placeholder="Customer full name"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(event) =>
                  updateField("phoneNumber", event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
                placeholder="+216 XX XXX XXX"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Email Optional
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
                placeholder="customer@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Order Type *
              </label>
              <select
                required
                value={formData.orderType}
                onChange={(event) =>
                  updateField(
                    "orderType",
                    event.target.value as "pickup" | "delivery"
                  )
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            {formData.orderType === "delivery" && (
              <div>
                <label className="mb-2 block font-medium text-gray-900">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.deliveryAddress}
                  onChange={(event) =>
                    updateField("deliveryAddress", event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
                  placeholder="Full delivery address"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Requested Date *
              </label>
              <input
                type="date"
                required
                value={formData.requestedDate}
                onChange={(event) =>
                  updateField("requestedDate", event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Time Slot *
              </label>
              <select
                required
                value={formData.timeSlot}
                onChange={(event) =>
                  updateField("timeSlot", event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
              >
                <option value="">Select a time slot</option>
                <option value="09:00 - 11:00">09:00 - 11:00</option>
                <option value="11:00 - 13:00">11:00 - 13:00</option>
                <option value="13:00 - 15:00">13:00 - 15:00</option>
                <option value="15:00 - 17:00">15:00 - 17:00</option>
                <option value="17:00 - 19:00">17:00 - 19:00</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-900">
                Notes
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(event) =>
                  updateField("notes", event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
                placeholder="Cake message, allergies, special instructions..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-pink-600 py-4 font-semibold text-white hover:bg-pink-700"
            >
              Continue to WhatsApp
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.quantity}x {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>
                </div>

                <p className="font-semibold text-pink-600">
                  {(item.price * item.quantity).toFixed(3)} TND
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-pink-600">
                {total.toFixed(3)} TND
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}