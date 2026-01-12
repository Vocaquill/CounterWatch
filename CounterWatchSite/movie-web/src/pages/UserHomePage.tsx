
function UserHomePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">

      {/* HERO */}
      <section className="w-full bg-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">

          <h1 className="text-4xl font-bold mb-4">
            Watch movies without limits
          </h1>

          <p className="text-zinc-400 max-w-2xl mb-8">
            Discover popular movies, new releases and your favorite genres.
          </p>

          <input
            type="text"
            placeholder="Search movies..."
            className="w-full max-w-3xl px-6 py-3 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>
      </section>

      {/* POPULAR MOVIES */}
      <section className="px-8">
        <h2 className="text-2xl font-semibold mb-4">Popular movies</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer"
            >
              <div className="h-48 bg-zinc-700 flex items-center justify-center text-zinc-400">
                Poster
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium">Movie title</h3>
                <p className="text-xs text-zinc-400">2024 • Action</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GENRES */}
      <section className="px-8 mt-12 space-y-8">
        {["Action", "Horror", "Sci-Fi"].map((genre) => (
          <div key={genre}>
            <h2 className="text-xl font-semibold mb-3">{genre}</h2>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[160px] bg-zinc-800 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer"
                >
                  <div className="h-40 bg-zinc-700 flex items-center justify-center text-zinc-400">
                    Poster
                  </div>

                  <div className="p-2">
                    <h3 className="text-sm">Movie</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

    </div>
  )
}

export default UserHomePage
