import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrders } from "@/lib/orders-server";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View customer orders submitted through the website.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-pink-50 text-sm text-gray-700">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-4 font-semibold text-gray-900">
                      {order.customer_name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.phone_number}
                    </td>

                    <td className="p-4 capitalize text-gray-600">
                      {order.order_type}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.requested_date}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.time_slot}
                    </td>

                    <td className="p-4 font-semibold text-pink-600">
                      {Number(order.total).toFixed(3)} TND
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-8 text-center text-gray-500"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}