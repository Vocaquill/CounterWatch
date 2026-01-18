import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../../utils/createBaseQuery.ts";
import type {IPagedResult} from "../../types/aditional.ts";
import type {IMovieItem, IMovieSearch} from "../../types/movie.ts";

export const apiMovies = createApi({
    reducerPath: 'api/movies',
    baseQuery: createBaseQuery('Movies'),
    tagTypes: ['Movies'],
    endpoints: (builder) => ({
        searchMovies: builder.query<IPagedResult<IMovieItem>, IMovieSearch>({
            query: () => ({
                url: 'Search',
                method: 'GET'
            }),
            providesTags: ['Movies']
        }),
    })
});

export const {
    useSearchMoviesQuery,
} = apiMovies;