import {  Toolbar } from "@mui/material";
import React from "react";
import { MenuProvider } from "./MenuProvider";
import RightNev from "./RightNev";
export default function NavBar() {
  return (
    <MenuProvider>
        <Toolbar sx={{ justifyContent: "space-between" }}>
        <RightNev/>
        </Toolbar>
    </MenuProvider>
  );
}