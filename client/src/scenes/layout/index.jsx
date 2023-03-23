import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from 'components/Navbar'
import Sidebar from "components/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../features/admin/admin.actions";

const Layout = () => {
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector(state=>state.global.userId)
   const   drawerWidth="250px";
    const data = dispatch(getUser(userId))
    return (
        <Box display={isNonMobile ? "flex":"block"} width="100%" height="100%">
            <Sidebar
                user={data || {}}
                drawerWidth={drawerWidth}
                isNonMobile={isNonMobile}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                />
            <Box flexGrow={1} paddingLeft={isSidebarOpen && isNonMobile ? drawerWidth : "0" } width="100%">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    user={data || {}}
                    setIsSidebarOpen = {setIsSidebarOpen}
                />
                <Outlet/>
            </Box>
        </Box>
    );
};

export default Layout;
