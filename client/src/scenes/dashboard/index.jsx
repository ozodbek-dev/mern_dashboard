import React, {useEffect} from 'react';
import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getDashboardData} from "../../features/admin/admin.actions";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import {DownloadOutlined, Email, People, PersonAdd, PointOfSale, Traffic} from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import OverviewChart from "../../components/OverviewChart";
import BreakdownChart from "../../components/BreakdownChart";

const Dashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {dashboardData, dashboardLoading:loading,} = useSelector(state=>state.adminApi)
    useEffect(() => {
      dispatch(getDashboardData())
    }, []);
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
    const isNonMediumScreen = useMediaQuery("(min-width:1200px)")
    if( loading) return <h1>Loading ... </h1>
    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to Dashboard"/>
                <Box>
                    <Button
                        sx={{
                            backgroundColor:theme.palette.secondary.light,
                            color:theme.palette.background.alt,
                            fontSize:"14px",
                            fontWeight:"bold",
                            padding:"10px 20px"
                        }}
                        startIcon={
                        <DownloadOutlined sx={{mr:"10px"}} />
                        }
                    >
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div":{
                        gridColumn:isNonMediumScreen ? undefined:"span 12"
                    }
                }}


            >

                <StatBox
                    title={'Total Customers'}
                    value={dashboardData && dashboardData.totalCustomers}
                    increase={'+14%'}
                    description="Since last Month"
                    icon={<People sx={{fontSize:'26px', color:theme.palette.secondary[300]}}/>}
                />
                <StatBox
                    title={'Daily sales'}
                    value={dashboardData && dashboardData.todayStats.totalSales}
                    increase={'+5%'}
                    description="Since last Month"
                    icon={<PointOfSale sx={{fontSize:'26px', color:theme.palette.secondary[300]}}/>}
                />
                <Box
                    gridColumn={"span 8"}
                    gridRow="span 2"
                    background={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart
                        view='sales'
                        isDashboard="true"
                    />
                </Box>
                <StatBox
                    title={'Monthly sales'}
                    value={dashboardData && dashboardData.thisMonthStats.totalSales}
                    increase={'+5%'}
                    description="Since last Month"
                    icon={<PersonAdd sx={{fontSize:'26px', color:theme.palette.secondary[300]}}/>}
                />
                <StatBox
                    title={'Yearly Sales'}
                    value={dashboardData && dashboardData.yearlySalesTotal}
                    increase={'+11%'}
                    description="Since this year"
                    icon={<Traffic sx={{fontSize:'26px', color:theme.palette.secondary[300]}}/>}
                />

                <Box
                    gridRow="span 3"
                    gridColumn="span 8"
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
                        loading={loading || !dashboardData?.transactions}
                        getRowId={(row)=>row._id}
                        columns={columns}
                        rows={dashboardData?.transactions || []}
                    />
                </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={theme.palette.background.alt}
                        p="1.5rem"
                        borderRadius="0.55rem"
                    >
                        <Typography variant={'h6'}
                                    sx={{color:theme.palette.secondary[100]}}>
                            Sales By Category
                        </Typography>

                        <BreakdownChart isDashboard={true}/>
                        <Typography p="0 0 0.6rem" fontSize=".8rem" sx={{color:theme.palette.secondary[200]}} >
                            BreakDonwn of real states and information via category  for revenue made for this year and total sales
                        </Typography>
                    </Box>


            </Box>


        </Box>
    );
};

export default Dashboard;
