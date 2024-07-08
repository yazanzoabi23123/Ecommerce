import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ScrollToTop from "./components/scroll/ScrollToTop";
import  Router from "./routes/Router";

function App() {
  
  const [theme, colorMode] = useMode();
  return (
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
  );
}

 export default App;
