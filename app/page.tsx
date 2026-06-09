export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8F4]">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
            Freshly Made Every Day
          </span>

          <h1 className="max-w-4xl text-5xl font-bold text-gray-900 md:text-7xl">
            Delicious Cakes &
            <span className="text-pink-600"> Pastries</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Browse our catalog, choose your favorite products and place your
            order directly through WhatsApp.
          </p>

          <button className="mt-8 rounded-full bg-pink-600 px-8 py-4 font-semibold text-white transition hover:bg-pink-700">
            Browse Products
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Our Categories
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold">🎂 Cakes</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold">🥐 Viennoiseries</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold">🍪 Cookies</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold">🧁 Cupcakes</h3>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Featured Products
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="h-60 bg-pink-100"></div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">Chocolate Cake</h3>

                <p className="mt-2 text-gray-600">
                  Rich chocolate cake with premium ingredients.
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-pink-600">
                    45.000 TND
                  </span>

                  <button className="rounded-full bg-pink-600 px-4 py-2 text-white hover:bg-pink-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}