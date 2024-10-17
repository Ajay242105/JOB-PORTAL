import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
name:'auth',
initialState:{
    loading:false,
    user:null
},
reducers:{
    //action
    setLoading: (state, action) => {
        // if (typeof action.payload === 'boolean') {
          state.loading = action.payload;
        // } else {
        //   console.error('Invalid payload type. Expected a boolean value.');
        // }

    //    
},
setUser: (state, action) => {
            state.user = action.payload;
      }


}

});
export const {setLoading,setUser}=authSlice.actions;
export default authSlice.reducer;