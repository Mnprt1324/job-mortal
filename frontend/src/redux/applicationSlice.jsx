import { createSlice } from "@reduxjs/toolkit";

const applicationSlice=createSlice({
    name:"application",
    initialState:{
        applicants:null,
        appliedJob:null
    },
    reducers:{
        setApplication:(state,action)=>{
            state.applicants=action.payload;
        },
        setAppliedJob:(state,action)=>{
            state.appliedJob=action.payload;
        }
    }

});
export const {setApplication,setAppliedJob}=applicationSlice.actions;
export default applicationSlice.reducer;