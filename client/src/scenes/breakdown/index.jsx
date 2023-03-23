import React from 'react';
import {Box, useMediaQuery} from "@mui/material";
import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";

const Breakdown = () => {
    const isNonMobile = useMediaQuery("(min-width:100px)")
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category"/>
            <Box mt='40px'
                 height={isNonMobile ? "75vh":"50vh"}
                 width={"100%"}
            >
                <BreakdownChart
                />
            </Box>
        </Box>
    );
};

export default Breakdown;
