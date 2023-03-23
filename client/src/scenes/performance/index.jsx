import React, {useEffect} from 'react';
import {Box, useTheme} from "@mui/material";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import CustomColumnMenu from "../../components/CustomColumnMenu";
import {useDispatch, useSelector} from "react-redux";
import {getAdmins, getPerformance} from "../../features/admin/admin.actions";

const Performance = () => {
    const theme = useTheme()
    const dispatch = useDispatch();
    const {sales,loading} = useSelector(state=>state.adminApi);
    const userId = useSelector(state=>state.global.userId)
    useEffect(() => {
        dispatch(getPerformance(userId))
    }, [userId]);
    const columns = [
        {
            field:"_id",
            headerName:"ID",
            flex:1
        },
        {
            field:"userId",
            headerName:"User ID",
            flex:1
        },
        {
            field:"createdAt",
            headerName:"CreatedAt",
            flex:1
        },
        {
            field:"products",
            headerName:"# of Products",
            flex:0.5,
            sortable:false,
            renderCell:(params)=>{
                return params.value.length
            }
        },
        {
            field:"cost",
            headerName:"Cost",
            flex:0.4
        },
        {
            field:"occupation",
            headerName:"Occupation",
            flex:0.5,
            renderCell:(params)=>`$${Number(params.value).toFixed(2)}`
        },
        {
            field:"role",
            headerName:"Role",
            flex:0.4
        },
    ]
    if(!sales || loading) return <h1>Loading ... </h1>
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales "/>
            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root":{
                        border:"none",
                    },
                    "& .MuiDataGrid-cell":{
                        borderBottom:"none",
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        background:theme.palette.background.alt,
                        color:theme.palette.secondary[100],
                        borderBottom:"none"
                    },
                    "& .MuiDataGrid-virtualScroller":{
                        background:theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer":{
                        background:theme.palette.background.alt,
                        color:theme.palette.secondary[100],
                        borderTop:"none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                        color:`${theme.palette.secondary[100]}!important`,
                    },
                }}
            >
                <DataGrid
                    loading={loading || !sales}
                    getRowId={(row)=>row._id}
                    columns={columns}
                    rows={sales || []}
                    slots={{columnMenu: CustomColumnMenu}}
                />
            </Box>
        </Box>
    );
};

export default Performance;
