import React, {useMemo, useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, useMediaQuery, useTheme} from "@mui/material";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import 'react-datepicker/dist/react-datepicker.css'

const Overview = () => {
    const [view, setView] = useState('units')

    const isNonMobile = useMediaQuery("(min-width:1000px)")
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title="OVERVIEW" subtitle="Overview of general revenue and profit"/>

            <Box
                height={isNonMobile ? "70vh" :'50vh'}
            >
             <Box mb={3} mt={'1rem'}>
                 <FormControl>
                     <InputLabel>View</InputLabel>
                     <Select value={view} label="View" onChange={e=>setView(e.target.value)}>
                         <MenuItem value='sales'>Sales</MenuItem>
                         <MenuItem value='units'>Units</MenuItem>
                     </Select>
                 </FormControl>
             </Box>
                    <OverviewChart isDashboard={true} view={view}/>
            </Box>

        </Box>
    );
};

export default Overview;
