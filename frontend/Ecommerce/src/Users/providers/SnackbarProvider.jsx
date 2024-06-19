import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext(null);

export default function SnackbarProvider({ children }) {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackColor, setSnackColor] = useState(null);
  const [snackVariant, setSnackVariant] = useState(null);
  const [snackMessage, setSnackMessage] = useState("in snackbar");

  const setSnack = useCallback((color, message, variant = "filled") => {
    setOpenSnack(true);
    setSnackColor(color);
    setSnackVariant(variant);
    setSnackMessage(message);
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackOpen}
        onClose={() => setOpenSnack((prev) => !prev)}
        autoHideDuration={5000}
      >
        <Alert severity={snackColor} variant={snackVariant}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
}

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw Error("useSnackbar must be used within a NameProvider");
  return context;
};
