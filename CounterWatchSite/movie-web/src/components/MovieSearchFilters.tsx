import type { IMovieSearch } from "../types/movie";

interface Props {
    searchParams: IMovieSearch;
    onChange: <K extends keyof IMovieSearch>(
        key: K,
        value: IMovieSearch[K]
    ) => void;
}

export function MovieSearchFilters({ searchParams, onChange }: Props) {
    return (
        <section className="px-6 md:px-12 max-w-5xl mx-auto mb-12 space-y-6">
            <input
                value={searchParams.title ?? ''}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="Назва фільму"
                className="w-full px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800
                   focus:border-red-600 outline-none text-white"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="number"
                    placeholder="Genre ID"
                    value={searchParams.genreId ?? ''}
                    onChange={(e) =>
                        onChange(
                            'genreId',
                            e.target.value ? Number(e.target.value) : undefined
                        )
                    }
                    className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800"
                />

                <input
                    type="number"
                    placeholder="Рік від"
                    value={searchParams.releaseYearFrom ?? ''}
                    onChange={(e) => onChange('releaseYearFrom', e.target.value)}
                    className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800"
                />

                <input
                    type="number"
                    placeholder="Рік до"
                    value={searchParams.releaseYearTo ?? ''}
                    onChange={(e) => onChange('releaseYearTo', e.target.value)}
                    className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800"
                />
            </div>

            {/* IMDb */}
            <input
                type="number"
                step="0.1"
                placeholder="IMDb від"
                value={searchParams.imdbRatingFrom ?? ''}
                onChange={(e) => onChange('imdbRatingFrom', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800"
            />
        </section>
    );
}
