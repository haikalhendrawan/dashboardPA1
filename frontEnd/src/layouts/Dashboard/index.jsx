import {Outlet} from "react-router-dom";
import { styled } from "@mui/material";
import Appbar from "../AppBar";


const StyledRoot = styled('div')({
  display: "flex",
  flexDirection: "column",
  minHeight:'100%',
  overflow:'hidden'
});

const MainContent = styled('div')(({theme})=>({
  flexGrow:1,
  display:'flex',
  overflow:'hidden',
  padding:'8px',
}));


export default function DashboardLayout() {
  return (
        <>
        <StyledRoot>
          <Appbar />
          <MainContent>
            <Outlet />
          </MainContent>
        </StyledRoot>
        </>
    )
};
