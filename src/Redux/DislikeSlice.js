import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const disLike = createAsyncThunk('userInfo/dislike', async ({bookName}) => {
  try {
    let {data} = await axios.delete(
      'https://localhost:7241/api/Home/RemoveLike',
      { bookName},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    return data; 
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});
const initialState = { dataDislike: null };
const DislikeSlice = createSlice({
  name: 'userDislike',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(disLike.fulfilled, (state, action) => {
      state.dataDislike = action.payload;
    });
    builder.addCase(disLike.rejected, (state, action) => {
    });
  },
});
const DislikeSliceReducer = DislikeSlice.reducer;
export default DislikeSliceReducer;