
// 1. Інтерфейс даних (клас)
export interface GenreMovieAdmin {
  id: number;
  name: string;
  slug: string;
  image?: string;
  movieCount?: number;
  dateCreate?: string;
  isDelete?: boolean;
}

export interface GenresState {
  items: GenreMovieAdmin[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IGenreItem {
  id: number;
  slug: string;
  image?: string;
  name: string;
}