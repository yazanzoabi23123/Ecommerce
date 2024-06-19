import Header2 from "./components/header/Header2";
import Header1 from "./components/header/Header1";
import Header3 from "./components/header/Header3";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Main from "./components/main/Main";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import  Router from "./routes/Router";
import CartPage from "./components/main/CartPage";

function App({chil}) {
  const [theme, colorMode] = useMode();
  return (
      // <BrowserRouter>
    <ColorModeContext.Provider
      // @ts-ignore
      value={colorMode}

    >
      <ThemeProvider
        // @ts-ignore
        theme={theme}
      >
        <CssBaseline />

       
        <Box
          bgcolor={
            // @ts-ignore
            theme.palette.bg.main
          }
        >
           <Router/> 
            
        </Box>
        
        

        <ScrollToTop />
      </ThemeProvider>
    </ColorModeContext.Provider>
       /* </BrowserRouter> */
  );
}

 export default App;
