import {
    fail,
    getCustomersSuccess, getGeographySuccess,
    getProductsSuccess, getOverviewSuccess,
    getSingleUserReq,
    getSingleUserSuccess,
    getTransactionsSuccess, getAdminsSuccess, getPerformanceSuccess, getDashboardSuccess, dashboardReq
} from "./admin.slice";
import axios, {get} from 'axios';
const url = process.env.REACT_APP_API ||  "https://admin-backend-3kq4.onrender.com"
export const getUser =(id)=> async (dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/general/user/${id}`);
        dispatch(getSingleUserSuccess(data))
    }catch (e){
        dispatch(fail(e.message))
    }
}

export const getProducts = ()=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/client/products`);
        dispatch(getProductsSuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}

export const getCustomers = ()=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/client/customers`);
        dispatch(getCustomersSuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}

export const getTransactions = (page,pageSize,sort,search)=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/client/transactions?page=${page}&pageSize=${pageSize}&search=${search}&sort=${sort}`);
        dispatch(getTransactionsSuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}
export const getGeography = ()=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/client/geography`);
        dispatch(getGeographySuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}
export const getOverview = ()=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/sales`);
        dispatch(getOverviewSuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}
export const getAdmins = ()=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/management/admins`);
        dispatch(getAdminsSuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}
export const getPerformance = (id)=>async(dispatch)=>{
    try {
        dispatch(getSingleUserReq())
        const {data} = await axios.get(`${url}/management/performance/${id}`);
        dispatch(getPerformanceSuccess(data))
    }catch (e) {
        dispatch(fail(e.message))
    }
}
export const getDashboardData = ()=>async(dispatch)=>{
    try {
        dispatch(dashboardReq())
        const {data} = await axios.get(`${url}/general/dashboard`);
        dispatch(getDashboardSuccess(data));
    }catch (e) {
        dispatch(fail(e.message))
    }
}