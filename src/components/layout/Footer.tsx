export default function Footer() {
    return (
      <footer className="mt-auto border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold text-pink-600">
                Sweet Bakery
              </h3>
  
              <p className="mt-3 text-sm text-gray-600">
                Fresh cakes, pastries and sweet creations made with love.
              </p>
            </div>
  
            <div>
              <h4 className="font-semibold text-gray-900">
                Contact
              </h4>
  
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>WhatsApp: +216 58 701 415</p>
                <p>Instagram: @sweetbakery</p>
                <p>Tunisia</p>
              </div>
            </div>
  
            <div>
              <h4 className="font-semibold text-gray-900">
                Opening Hours
              </h4>
  
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>Monday - Friday: 08:00 - 18:00</p>
                <p>Saturday: 08:00 - 16:00</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
  
          <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Sweet Bakery. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }