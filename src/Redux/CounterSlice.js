import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const getData = createAsyncThunk('userInfo/getData', async () => {
  let { data } = await axios.get(`https://localhost:7241/api/Account/GetUserData`, 
  {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
});

const initialState = { dataUser: null };
const userinfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.dataUser = action.payload;
    });
    builder.addCase(getData.rejected, (state, action) => {
      // Handle rejection here
    });
  },
});

const userinfoReducer = userinfoSlice.reducer;
export default userinfoReducer;
