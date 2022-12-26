import React from "react";
import Navbar from "./Navbar";
import { Box , Container} from "@mui/material";

function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      
      {children}
    </Box>
  );
}

export default Layout;
