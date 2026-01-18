import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../../utils/createBaseQuery.ts";
import type {IPagedResult} from "../../types/aditional.ts";
import type {IMovieGetBySlug, IMovieItem, IMovieSearch} from "../../types/movie.ts";

export const apiMovies = createApi({
    reducerPath: 'api/movies',
    baseQuery: createBaseQuery('Movies'),
    tagTypes: ['Movies', "Movie"],
    endpoints: (builder) => ({
        searchMovies: builder.query<IPagedResult<IMovieItem>, IMovieSearch>({
            query: () => ({
                url: 'Search',
                method: 'GET'
            }),
            providesTags: ['Movies']
        }),

        getBySlug: builder.query<IMovieItem, IMovieGetBySlug>({
            query: (slug) => ({
                url: `BySlug/${slug}`,
                method: 'GET'
            }),
        })
    })
});

export const {
    useSearchMoviesQuery,
    useGetBySlugQuery,
} = apiMovies;