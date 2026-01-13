import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for Genres
interface Genre {
    id: number;
    name: string;
}

// Define a state interface
interface GenresState {
    genres: Genre[];
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: GenresState = {
    genres: [],
    loading: false,
    error: null,
};

// Fetch Genres Thunk with Improved Typing
export const fetchGenres = createAsyncThunk<
    Genre[], // Success return type
    { page: number; itemPerPage: number }, // Argument type
    { rejectValue: string } // Rejected value type
>(
    'genres/fetchGenres',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get<Genre[]>('/api/genres', { params });
            return response.data; // Return the fetched genres
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('Failed to fetch genres');
        }
    }
);

// Genre Slice
const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        resetGenres: (state) => {
            state.genres = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { resetGenres } = genresSlice.actions;
export default genresSlice.reducer;