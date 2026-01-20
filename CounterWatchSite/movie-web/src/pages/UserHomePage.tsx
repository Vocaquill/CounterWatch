import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MovieCard } from '../components/movie/MovieCard.tsx';

import { useSearchMoviesQuery } from '../services/api/apiMovies';
import type { IMovieSearch } from '../types/movie';
import {MovieSearchFilters} from "../components/movie/MovieSearchFilters.tsx";
import {Pagination} from "../components/Pagination.tsx";

function UserHomePage() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState<IMovieSearch>({
        title: '',
        page: 1,
        itemPerPage: 12,
    });

    const { data, isFetching } = useSearchMoviesQuery(searchParams);

    const handleChange = <K extends keyof IMovieSearch>(
        key: K,
        value: IMovieSearch[K]
    ) => {
        setSearchParams((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">

            <section className="w-full py-24 text-center">
                <h1 className="text-6xl font-black italic uppercase">
                    Watch <span className="text-red-600">Movies</span>
                </h1>
            </section>

            <MovieSearchFilters
                searchParams={searchParams}
                onChange={handleChange}
            />

            <section className="px-6 md:px-12 max-w-[1800px] mx-auto">
                {isFetching && (
                    <div className="text-center py-20 text-zinc-500">
                        Завантаження...
                    </div>
                )}

                {!isFetching && data?.items.length === 0 && (
                    <div className="text-center py-20 text-zinc-500">
                        Нічого не знайдено
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {data?.items.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => navigate(`/movie/${movie.slug}`)}
                        />
                    ))}
                </div>

                {data && (
                    <Pagination
                        currentPage={data.currentPage}
                        totalPages={data.totalPages}
                        onChange={(page) =>
                            setSearchParams((prev) => ({ ...prev, page }))
                        }
                    />
                )}
            </section>
        </div>
    );
}

export default UserHomePage;
