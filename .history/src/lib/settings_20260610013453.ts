import { supabase } from "@/lib/supabase";
import { BusinessSettings } from "@/types/settings";

type SupabaseSettings = {
  business_name: string;
  whatsapp_number: string;
  instagram_url: string | null;
  address: string | null;
  opening_hours: string[] | null;
};

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const { data, error } = await supabase
    .from("settings")
    .select("business_name, whatsapp_number, instagram_url, address, opening_hours")
    .limit(1)
    .single();

  if (error || !data) {
    console.error("Error fetching settings:", error);

    return {
      businessName: "Sweet Bakery",
      whatsappNumber: "21658701415",
      instagramUrl: "",
      address: "Tunisia",
      openingHours: [],
    };
  }

  const settings = data as SupabaseSettings;

  return {
    businessName: settings.business_name,
    whatsappNumber: settings.whatsapp_number,
    instagramUrl: settings.instagram_url || "",
    address: settings.address || "",
    openingHours: settings.opening_hours || [],
  };
}