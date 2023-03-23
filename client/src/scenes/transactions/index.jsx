import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, useTheme} from "@mui/material";
import {getTransactions} from "../../features/admin/admin.actions";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
const Transactions = () => {
    const dispatch = useDispatch();
    const theme= useTheme();
    const {loading , transactions, total} = useSelector(state=>state.adminApi)
    const [page, setPage] = useState(1);
    const [search , setSearch ] = useState("");
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [searchInput, setSearchInput] = useState("")


    useEffect(()=>{
        dispatch(getTransactions(page, pageSize,JSON.stringify(sort),search));
    },[])
    useEffect(()=>{
        dispatch(getTransactions(page, pageSize,JSON.stringify(sort),search));
    },[page, pageSize, search,sort])

    const columns = [
        {
            field:"_id",
            headerName:"ID",
            flex:1
        },
        {
            field:"userId",
            headerName:"userId",
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
            sortable:false,
            flex:0.5,
            renderCell:(params)=>{
                return params.value.length
            }
        },
        {
            field:"cost",
            headerName:"Cost",
            flex:0.4,
            renderCell:(params)=>{
                return `$${Number(params.value).toFixed(2)}`
            }
        }
    ];
    const handleSortModelChange = React.useCallback((sortModel) => {
        console.log(sortModel)
        setSort(...sortModel)
    }, [sort]);
const handlePageChangeSize = React.useCallback((model) => {
        setPageSize(model.pageSize)
        setPage(model.page)
    }, [page, pageSize]);
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TRANSACTIONS" subtitle="Entire List of Transactions"/>
            <Box
                mt="40px"
                height="80vh"
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
                    loading={loading || !transactions}
                    getRowId={(row)=>row._id}
                    columns={columns}
                    rows={transactions || []}
                    rowCount={total || 0}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    pageSizeOptions={[10,20,50,100]}
                    paginationMode='server'
                    sortingMode='server'
                    paginationModel={{pageSize,page}}
                    onPaginationModelChange={handlePageChangeSize}
                    onSortModelChange={handleSortModelChange}
                    slots={{toolbar:DataGridCustomToolbar}}
                    slotProps={{
                        toolbar:{searchInput, setSearchInput, setSearch}
                    }}
                />
            </Box>
        </Box>
    );
};

export default Transactions;
