import { getBusinessSettings } from "@/lib/settings";

export default async function Footer() {
  const businessSettings = await getBusinessSettings();

  return (
    <footer className="mt-auto border-t border-[#F3E7E2] bg-[#FFFDFB]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A05A]">
              FYANKA
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Handmade cakes, pastries and sweet creations crafted with love.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Contact</h4>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>WhatsApp: +{businessSettings.whatsappNumber}</p>

              {businessSettings.instagramUrl && (
                <a
                  href={businessSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[#B97A95]"
                >
                  Instagram
                </a>
              )}

              <p>{businessSettings.address}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Opening Hours</h4>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              {businessSettings.openingHours.map((hour) => (
                <p key={hour}>{hour}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Fyanka Bakery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
