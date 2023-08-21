import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getFav = createAsyncThunk('userInfo/getFav', async () => {
  let { data } = await axios.get(`https://localhost:7241/api/Home/AllfavBooks`, 
  {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
});
const initialState = { dataUserfav:null };
const userfavSlice = createSlice({
  name: 'userFav',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFav.fulfilled, (state, action) => {
      state.dataUserfav = action.payload;
    });
    builder.addCase(getFav.rejected, (state, action) => {
      
    });
  },
});

const userFavReducer = userfavSlice.reducer;
export default userFavReducer;
