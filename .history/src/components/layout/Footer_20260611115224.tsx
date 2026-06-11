import { getBusinessSettings } from "@/lib/settings";

export default async function Footer() {
  const businessSettings = await getBusinessSettings();

  return (
    <footer className="mt-auto border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
className="text-2xl font-bold text-pink-600 [font-family:var(--font-playfair)]"              {businessSettings.businessName}
            </h3>

            <p className="mt-3 text-sm text-gray-600">
              Fresh cakes, pastries and sweet creations made with love.
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
                  className="block hover:text-pink-600"
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
          © {new Date().getFullYear()} {businessSettings.businessName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}