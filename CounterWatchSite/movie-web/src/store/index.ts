import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './slices/genresSlice';
import {apiMovies} from "../services/api/apiMovies.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {apiGenres} from "../services/api/apiGenres.ts";

export const store = configureStore({
    reducer: {
        genres: genresReducer,
        [apiMovies.reducerPath]: apiMovies.reducer,
        [apiGenres.reducerPath]: apiGenres.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiMovies.middleware,
            apiGenres.middleware
        )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector