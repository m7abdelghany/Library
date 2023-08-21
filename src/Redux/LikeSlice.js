import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const isLike = createAsyncThunk('userInfo/getFav', async ({bookName}) => {
  try {
    const response = await axios.post(
      'https://localhost:7241/api/Home/Like',
      {
        bookName
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});
const initialState = { dataislike:[] };
const islikeSlice = createSlice({
  name: 'userlike',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(isLike.fulfilled, (state, action) => {
      state.dataislike = action.payload;
    });
    builder.addCase(isLike.rejected, (state, action) => {
    });
  },
});
const LikeSliceReducer = islikeSlice.reducer;
export default LikeSliceReducer;
