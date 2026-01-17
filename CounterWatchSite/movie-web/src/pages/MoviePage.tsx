import { motion } from 'framer-motion';
import { Play, Star, Calendar, Clock, ChevronLeft, Share2, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

function MoviePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Отримає '101' з URL
  // Тимчасові дані фільму
  const movie = {
    title: "Інтерстеллар",
    rating: 8.7,
    year: 2014,
    duration: "2г 49хв",
    genres: ["Фантастика", "Драма", "Пригоди"],
    description: "Коли посуха, пилові бурі та вимирання рослин приводять людство до продовольчої кризи, колектив дослідників та науковців вирушає крізь червоточину в подорож, щоб знайти планету з придатними умовами для життя людства.",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop"
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-950 text-white pb-20">

        {/* Header / Hero Section */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <img
              src={movie.backdrop}
              className="w-full h-full object-cover opacity-40"
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>

          {/* Navigation Controls */}
          <div className="relative z-10 p-6 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="p-3 bg-zinc-900/50 backdrop-blur-md rounded-full hover:bg-zinc-800 transition-all border border-zinc-800"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              <button className="p-3 bg-zinc-900/50 backdrop-blur-md rounded-full hover:bg-zinc-800 transition-all border border-zinc-800">
                <Share2 size={20} />
              </button>
              <button className="p-3 bg-zinc-900/50 backdrop-blur-md rounded-full hover:bg-zinc-800 transition-all border border-zinc-800 text-red-500">
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Movie Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-4xl space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full border border-red-600/30">
                    {genre}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                {movie.title}
              </h1>
              <div className="flex items-center gap-6 text-zinc-400 text-sm font-medium">
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-white font-bold">{movie.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{movie.duration}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-20">

          {/* Left Side: Player Placeholder & Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* PLAYER PLACEHOLDER */}
            <div className="aspect-video w-full bg-zinc-900 rounded-3xl border border-zinc-800 flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40 z-10"
              >
                <Play size={32} fill="white" className="ml-1" />
              </motion.div>
              <p className="mt-4 text-zinc-500 font-bold tracking-widest uppercase text-xs z-10">Відеопрогравач буде тут</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold border-l-4 border-red-600 pl-4">Про що фільм</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Right Side: Additional Info / Sidebar */}
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 space-y-6">
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Деталі</h3>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500 text-sm">Країна</span>
                  <span className="text-zinc-200 text-sm">США, Велика Британія</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500 text-sm">Режисер</span>
                  <span className="text-zinc-200 text-sm">Крістофер Нолан</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500 text-sm">Актори</span>
                  <span className="text-zinc-200 text-sm text-right max-w-[150px]">Меттью Макконахі, Енн Гетевей</span>
                </div>
              </div>
            </div>

            {/* Тимчасова заглушка для схожих фільмів */}
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Схожі фільми</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="aspect-[2/3] bg-zinc-900 rounded-xl border border-zinc-800 animate-pulse" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}

export default MoviePage;
