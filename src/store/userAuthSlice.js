import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuthenicated:false,
    userName:"",
    authToken:null,
}
const userAuthSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        setUserToAuthenticated(state,action){
            state.isUserAuthenicated=action.payload;
        },
        setUserName:(state,action)=>{
            state.userName=action.payload;
        },
        setAuthToken:(state,action)=>{
            state.authToken=action.payload;
        }
    }
})

export default userAuthSlice.reducer;
export const {setUserToAuthenticated,setUserName,setAuthToken} = userAuthSlice.actions;