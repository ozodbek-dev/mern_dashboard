import React, {useEffect} from 'react';
import {ResponsiveChoropleth} from '@nivo/geo'
import {Box, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getGeography} from "../../features/admin/admin.actions";
import Header from "../../components/Header";
import {geoData} from "../../app/geoData";

const Geography = () => {
    const theme =  useTheme();
    const dispatch = useDispatch();
    const {geography , loading} = useSelector(state=>state.adminApi)
    useEffect(()=>{
        dispatch(getGeography())
    },[])

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GEOGRAPHY" subtitle="Find here your users located."/>
            <Box
                mt="40px"
                height="75vh"
                border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
            >
                {
                   geography ?   <ResponsiveChoropleth
                       data={geography}
                       theme={{
                           axis: {
                               domain: {
                                   line: {
                                       stroke: theme.palette.secondary[200],
                                   },
                               },
                               legend: {
                                   text: {
                                       fill: theme.palette.secondary[200],
                                   },
                               },
                               ticks: {
                                   line: {
                                       stroke: theme.palette.secondary[200],
                                       strokeWidth: 1,
                                   },
                                   text: {
                                       fill: theme.palette.secondary[200],
                                   },
                               },
                           },
                           legends: {
                               text: {
                                   fill: theme.palette.secondary[200],
                               },
                           },
                           tooltip: {
                               container: {
                                   color: theme.palette.primary.main,
                               },
                           },
                       }}
                       features={geoData.features}
                       margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                       domain={[0, 60]}
                       unknownColor="#666666"
                       label="properties.name"
                       valueFormat=".2s"
                       projectionScale={150}
                       projectionTranslation={[0.45, 0.6]}
                       projectionRotation={[0, 0, 0]}
                       borderWidth={1.3}
                       borderColor="#ffffff"
                       legends={[
                           {
                               anchor: "bottom-right",
                               direction: "column",
                               justify: true,
                               translateX: 0,
                               translateY: -125,
                               itemsSpacing: 0,
                               itemWidth: 94,
                               itemHeight: 18,
                               itemDirection: "left-to-right",
                               itemTextColor: theme.palette.secondary[200],
                               itemOpacity: 0.85,
                               symbolSize: 18,
                               effects: [
                                   {
                                       on: "hover",
                                       style: {
                                           itemTextColor: theme.palette.background.alt,
                                           itemOpacity: 1,
                                       },
                                   },
                               ],
                           },
                       ]}
                   />:<h1>loading...</h1>
                }
            </Box>
        </Box>
    );
};

export default Geography;
