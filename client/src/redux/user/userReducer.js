import {createReducer} from '@reduxjs/toolkit';
import {login,logout,flipFlag} from './userActions';
const initialState = {
    user : {},
    flag:1
}
const userReducer = createReducer(initialState,(builder)=>{
    builder
        .addCase(login,(state,action)=>{
            state.user=action.payload
        })
        .addCase(logout,(state,action)=>{
            state.user={}
        })
        .addCase(flipFlag,(state,action)=>{
            state.flag = state.flag*-1
        })
});
export default userReducer;