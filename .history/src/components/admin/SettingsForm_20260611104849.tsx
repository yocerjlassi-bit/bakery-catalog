"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BusinessSettings } from "@/types/settings";

interface SettingsFormProps {
  settings: BusinessSettings;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [businessName, setBusinessName] = useState(settings.businessName);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || "");
  const [address, setAddress] = useState(settings.address);
  const [openingHours, setOpeningHours] = useState(
    settings.openingHours.join("\n")
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const openingHoursArray = openingHours
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("settings")
      .update({
        business_name: businessName,
        whatsapp_number: whatsappNumber,
        instagram_url: instagramUrl,
        address,
        opening_hours: openingHoursArray,
      })
      .not("id", "is", null);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Settings updated successfully.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Business Name
        </label>
        <input
          required
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          WhatsApp Number
        </label>
        <input
          required
          value={whatsappNumber}
          onChange={(event) => setWhatsappNumber(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
          placeholder="21658701415"
        />
        <p className="mt-1 text-sm text-gray-500">
          Use international format without + or spaces.
        </p>
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Instagram URL
        </label>
        <input
          value={instagramUrl}
          onChange={(event) => setInstagramUrl(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
          placeholder="https://instagram.com/..."
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Address
        </label>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Opening Hours
        </label>
        <textarea
          rows={5}
          value={openingHours}
          onChange={(event) => setOpeningHours(event.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
          placeholder={`Monday - Friday: 08:00 - 18:00\nSaturday: 08:00 - 16:00`}
        />
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-pink-600 py-3 font-semibold text-white hover:bg-pink-700"
      >
        Save Settings
      </button>
    </form>
  );
}