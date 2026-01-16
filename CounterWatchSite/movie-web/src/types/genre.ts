
// 1. Інтерфейс даних (клас)
export interface GenreMovieAdmin {
  id: number;
  name: string;
  slug: string;
  image?: string;         // Додаємо опціональне поле image
  movieCount?: number;    // Робимо опціональним
  dateCreate?: string;    // Робимо опціональним
  isDelete?: boolean;     // Робимо опціональним
}

export interface GenresState {
  items: GenreMovieAdmin[];         // Масив жанрів
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Статус запиту
  error: string | null;             // Текст помилки, якщо вона є
}