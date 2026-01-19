import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../../utils/createBaseQuery.ts";
import type {IPagedResult} from "../../types/aditional.ts";
import type {IGenreItem, IGenreSearch} from "../../types/genre.ts";

export const apiGenres = createApi({
    reducerPath: 'api/genres',
    baseQuery: createBaseQuery('Genres'),
    tagTypes: ['Genres'],
    endpoints: (builder) => ({
        searchGenres: builder.query<IPagedResult<IGenreItem>, IGenreSearch>({
            query: (params) => ({
                url: 'Search',
                method: 'GET',
                params,
            }),
            providesTags: ['Genres']
        })
    })
});

export const {
    useSearchGenresQuery,
} = apiGenres;