"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-6 py-16">
      <section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            type="email"
            required
            placeholder="Admin email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#B8894D]"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#B8894D]"
          />

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}