import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = ({ setSearchQuery }) => {
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}
    sx={{
      "@media (min-width: 600px)": {
        flexDirection: "row",
        justifyContent: "space-between",
      },
    }}>
      <Box display="flex" borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1, color: "#03609C" }}
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
        <IconButton type="button" sx={{ p: 1, color: "#03609C" }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
