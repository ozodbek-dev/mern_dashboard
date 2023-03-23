import React, {useEffect} from 'react';
import {Box, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import {getCustomers} from "../../features/admin/admin.actions";

const Customers = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {customers, loading} = useSelector(state=>state.adminApi)
    useEffect(() => {
      dispatch(getCustomers())
    }, []);

    const columns = [
        {
            field:"_id",
            headerName:"ID",
            flex:1
        },
        {
            field:"name",
            headerName:"Name",
            flex:0.5
        },
        {
            field:"email",
            headerName:"Email",
            flex:1
        },
        {
            field:"phoneNumber",
            headerName:"Phone Number",
            flex:0.5,
            renderCell:(params)=>{
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/ , "($1)$2-$3")
            }
        },
        {
            field:"country",
            headerName:"Country",
            flex:0.4
        },
        {
            field:"occupation",
            headerName:"Occupation",
            flex:0.4
        },
        {
            field:"role",
            headerName:"Role",
            flex:0.4
        },
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="CUSTOMERS" subtitle="List of Customers"/>
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
                   loading={loading || !customers}
                   getRowId={(row)=>row._id}
                   columns={columns}
                   rows={customers || []}
               />
            </Box>
        </Box>
    );
};

export default Customers;
