// forecastSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  forecast: null,
  status: 'idle',
  error: null,
};

// Define thunk for fetching forecast asynchronously
export const fetchForecastAsync = createAsyncThunk('forecast/fetchForecast', async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch forecast');
  }
});

// Create forecast slice
export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecastAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchForecastAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.forecast = action.payload;
      })
      .addCase(fetchForecastAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

// Export reducer
export default forecastSlice.reducer;
