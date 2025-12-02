import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch restaurants from new API
export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants', async () => {
  const response = await fetch('http://127.0.0.1:2525/restaurants');
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  const data = await response.json();
  return data;
});

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    filteredRestaurants: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterRestaurants: (state, action) => {
      const filterText = action.payload.toLowerCase();
      state.filteredRestaurants = state.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(filterText)
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
        state.filteredRestaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterRestaurants } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
