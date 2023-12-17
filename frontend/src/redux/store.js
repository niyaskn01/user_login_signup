import { configureStore, createSlice } from "@reduxjs/toolkit";



const userInLocalStorage=JSON.parse(localStorage.getItem('userData'))
const initialState={
  userID:userInLocalStorage?.userID || null,
  token:userInLocalStorage?.token || null
}

const userSlice=createSlice({
  name:'user',
  initialState,
  reducers:{
    setUser:(state,action)=>{
      state.userID=action.payload.userID
      state.token=action.payload.token
    },
    clearUser:(state)=>{
      state.userID=null;
      state.token=null
    }
  }
})




const store=configureStore({
  reducer:{
    userData:userSlice.reducer
  }
})







export const { setUser, clearUser } = userSlice.actions;
export default store