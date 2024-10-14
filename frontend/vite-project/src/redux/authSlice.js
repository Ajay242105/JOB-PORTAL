import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
name:'auth',
initialState:{
    loading:false
},
reducers:{
    //action
    setLoading: (state, action) => {
        // if (typeof action.payload === 'boolean') {
          state.loading = action.payload;
        // } else {
        //   console.error('Invalid payload type. Expected a boolean value.');
        // }
      }
}

});
export const {setLoading}=authSlice.actions;
export default authSlice.reducer;