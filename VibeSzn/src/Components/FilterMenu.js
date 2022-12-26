import React , {useState}from "react";
import { Box, Typography, Stack, Button, Input, IconButton } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import "../Styles/filtermenu.css";
import SortIcon from "@mui/icons-material/Sort";
import { useLazyQuery } from "@apollo/client";
import { GET_ITEMS_QUERY } from "../graphql/queries";




function FilterMenu() {

  // const [searchInput , setSearchInput] = useState("")

  // const [submitSearch, {data: searchData ,loading: searchLoading , error: searchError}] = useLazyQuery(GET_ITEMS_QUERY , 
  //   {variables:{
  //     searchInput: searchInput,
  //   },
  //   onCompleted: (queryData) => {
  //     console.log(queryData)
  //   }
  //   })

  //   if (searchData) {console.log(searchData)}

  //   if (searchError) {console.log(searchError)}

  //   if (searchLoading) { console.log("search is loading")}

  
  return (
    <Box className="search-cont">
      <Stack
        direction="row"
        sx={{
          marginLeft: "30px",
          marginTop: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* <Box className="left-cont">
          <input className="search" placeholder="Search by keyword..." onChange={(e) => {setSearchInput(e.target.value)}} />
        <IconButton  onClick={()=>searchInput()}>
          <QrCodeScannerIcon fontSize="large" /></IconButton>
        </Box> */}
        <Box
          className="btn-container"
          sx={{ marginRight: "30px", marginTop: "12px" }}
        >
          <Button variant="contained">
            <SortIcon />
            Filter
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default FilterMenu;
