import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrderById } from "@/lib/orders-server";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/admin/orders"
          className="text-sm font-semibold text-pink-600"
        >
          ← Back to orders
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Order Details
              </h1>

              <p className="mt-2 text-gray-500">
                Order ID: {order.id}
              </p>
            </div>

            <div>
  <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
    {order.status}
  </span>

  <OrderStatusForm
    orderId={order.id}
    currentStatus={order.status}
  />
</div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-pink-50 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Customer
              </h2>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>Name: {order.customer_name}</p>
                <p>Phone: {order.phone_number}</p>
                <p>Email: {order.email || "Not provided"}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-pink-50 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Fulfillment
              </h2>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>Type: {order.order_type}</p>
                <p>Date: {order.requested_date}</p>
                <p>Time: {order.time_slot}</p>
                {order.delivery_address && (
                  <p>Address: {order.delivery_address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-pink-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Products
            </h2>

            <div className="mt-4 space-y-4">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-3 last:border-b-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.quantity}x {item.product_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Unit: {Number(item.unit_price).toFixed(3)} TND
                    </p>
                  </div>

                  <p className="font-bold text-pink-600">
                    {Number(item.total_price).toFixed(3)} TND
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total</span>
              <span className="text-pink-600">
                {Number(order.total).toFixed(3)} TND
              </span>
            </div>
          </div>

          {order.notes && (
            <div className="mt-8 rounded-2xl bg-pink-50 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Notes
              </h2>

              <p className="mt-3 text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}