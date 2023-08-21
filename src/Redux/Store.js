import { configureStore } from '@reduxjs/toolkit';
import userinfoReducer from './CounterSlice';
import userFavReducer from './FavouriteSlice';
import DislikeSliceReducer from './DislikeSlice';
import LikeSliceReducer from './LikeSlice';
import SignoutReducer from './SignoutSlice'; 

const store = configureStore({
  reducer: {
    dataUser: userinfoReducer,
    dataUserfav: userFavReducer,
    dataDislike: DislikeSliceReducer,
    dataislike: LikeSliceReducer,
    signoutData: SignoutReducer
  },
});


export default store;