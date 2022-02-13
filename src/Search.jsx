import React from 'react';

import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({ searchInput }) => {
    const [search, setSearch] = React.useState("");

    const handleSearch = e => {
        e.preventDefault();
        searchInput(search)
    };
    return (
        <TextField
            style={{ width: "100%" }}
            label="Search Task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            onKeyUp={(e) => handleSearch(e)}
        />
    )
}
export default Search