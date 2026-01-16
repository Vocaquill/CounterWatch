import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './slices/genresSlice';
// import imagesReducer from './slices/imagesSlice';

export const store = configureStore({
    reducer: {
        genres: genresReducer,
        // images: imagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;