import {createSlice} from "@reduxjs/toolkit";


const initialState={

}

const adminSlice = createSlice({
    name:"adminAPI",
    initialState,
    reducers:{
        getSingleUserReq:(state)=>{
            state.loading=true;
        },
        getSingleUserSuccess:(state,{payload})=>{
            state.loading=false;
            state.singleUser= payload;
        },
        getProductsSuccess:(state,{payload})=>{
            state.loading=false;
            state.products=payload;
        },
        getCustomersSuccess:(state,{payload})=>{
            state.loading=false;
            state.customers=payload;
        },
        getTransactionsSuccess:(state,{payload})=>{
            state.loading=false;
            state.transactions=payload.transactions;
            state.total=payload.total
        },
        getGeographySuccess:(state,{payload})=>{
            state.loading=false;
            state.geography = payload;
        },
        getOverviewSuccess:(state,{payload})=>{
            state.loading=false;
            state.data=payload
        },
        getAdminsSuccess:(state,{payload})=>{
            state.loading=false;
            state.admins=payload
        },
        getPerformanceSuccess:(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
            state.sales=payload.sales
        },
        dashboardReq:(state)=>{
            state.dashboardLoading =true
        },
        getDashboardSuccess:(state,{payload})=>{
            state.dashboardLoading=false;
            state.dashboardData = payload
        },
        fail:(state,{payload})=>{
            state.loading=false;
            state.error= payload
        },
        clearError:(state)=>{
            state.error=null
        }
    }
})

export const {
    getSingleUserReq,
    getSingleUserSuccess,
    getPerformanceSuccess,
    getDashboardSuccess,
    fail,
    getCustomersSuccess,
    dashboardReq,
    getProductsSuccess,
    getTransactionsSuccess,
    getGeographySuccess,getOverviewSuccess,getAdminsSuccess,
    clearError
} = adminSlice.actions

export default adminSlice.reducer