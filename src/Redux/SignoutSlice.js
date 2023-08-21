import { createSlice } from "@reduxjs/toolkit";
let initialState =  localStorage.getItem("token");
const SignoutSlice = createSlice({
  name: "SignoutData",
  initialState,
  reducers: {
    removeToken: (state) => {
      localStorage.removeItem("token");
        },
  },
});
export default SignoutSlice.reducer;
export const { removeToken } = SignoutSlice.actions;
