"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface OrderStatusFormProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusForm({
  orderId,
  currentStatus,
}: OrderStatusFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [status, setStatus] = useState(currentStatus);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Status updated successfully.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button
        type="submit"
        className="rounded-full bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
      >
        Save Status
      </button>

      {message && (
        <p className="self-center text-sm text-gray-600">{message}</p>
      )}
    </form>
  );
}