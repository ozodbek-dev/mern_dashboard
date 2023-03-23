import React from 'react';
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width={"100%"} my={3}>
                <FlexBetween>
                    <GridToolbarColumnsButton/>
                    <GridToolbarDensitySelector/>
                    <GridToolbarExport/>
                </FlexBetween>
                <TextField
                    label={'Search...'}
                    variant="standard"
                    sx={{
                        mg:".5rem",
                        width:"15rem"
                    }}
                    onChange={e=>setSearchInput(e.target.value)}
                    value={searchInput}
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position={"end"}>
                                <IconButton
                                    onClick={()=>{
                                        setSearch(searchInput)
                                        setSearchInput('')
                                    }}
                                >
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
};

export default DataGridCustomToolbar;
