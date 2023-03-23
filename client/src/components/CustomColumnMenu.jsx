import React from 'react';
import {GridColumnMenuContainer,GridColumnMenuFilterItem, GridColumnMenuHideItem, GridColumnMenu} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
    return (

        <GridColumnMenu
            {...props}
        >
            <GridColumnMenuFilterItem onClick={props.hideMenu} column={props.currentColumn}/>
            <GridColumnMenuHideItem onClick={props.hideMenu} column={props.currentColumn} />
        </GridColumnMenu>
    );
};

export default CustomColumnMenu;
