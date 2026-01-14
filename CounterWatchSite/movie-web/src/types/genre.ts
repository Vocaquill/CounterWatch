
// 1. Інтерфейс даних (клас)
export interface GenreMovieAdmin {
  id: number;           // bigint в БД
  name: string;
  slug: string;
  movieCount: number;
  dateCreate: Date;     // тип часу
  isDelete: boolean;
}
