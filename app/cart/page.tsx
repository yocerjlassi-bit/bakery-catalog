"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
          <p className="mt-4 text-gray-600">Your cart is empty.</p>

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
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Your Cart
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm text-pink-600">{item.category}</p>
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.name}
                </h2>
                <p className="text-gray-600">
                  {item.price.toFixed(3)} TND
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="h-9 w-9 rounded-full bg-pink-100 text-pink-700"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="h-9 w-9 rounded-full bg-pink-100 text-pink-700"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-sm font-medium text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-pink-600">{total.toFixed(3)} TND</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <button
              onClick={clearCart}
              className="rounded-full border border-pink-600 px-6 py-3 font-semibold text-pink-600 hover:bg-pink-50"
            >
              Clear Cart
            </button>

            <button className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
              Continue to WhatsApp Order
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}