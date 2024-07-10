import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/product";
import { AnimatePresence, motion } from "framer-motion";
import { deleteProduct, getProducts } from "./services/productApiService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import CartPage from "./CartPage";
import Header1 from "../header/Header1";
import NavBarLink from "../../routes/components/NavBarLink";
import { useUser } from "../../Users/providers/UserProvider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductDeleteDialog from "./ProductDeleteDialog";
import useProducts from "./hooks/useProducts";
import { useSnack } from "../../Users/providers/SnackbarProvider.jsx";


const Main = ({product}) => {
 
  const {user} = useUser();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isDialogOpen, setDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(undefined);


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
 
  const handleClose = () => {
    setOpen(false);
  };

   const allProductsAPI = "https://localhost:7238/api/Products";
  const [myDate, setmyDate] = useState(allProductsAPI);
  const { data, error, isLoading,isFetching } = useGetproductByNameQuery(myDate);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = params.get('q'); 
  const {handleGetProducts} = useProducts();
  const snack = useSnack();

  const handleDeleteProduct = () => {
    deleteProduct(idToDelete);
    setDialog(false);
    setIdToDelete(undefined);
    snack("success", "The Product has been Deleted Successfully");

    
   
    
  };
  

  if (isFetching) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {
            // @ts-ignoreg
            error.error
          }
        </Typography>

        <Typography variant="h6">NetWork Error</Typography>
        <Typography variant="h6">Please connect to the server</Typography>
      </Container>
    );
  }

  if (data) {
    return (
      
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>

          <ToggleButtonGroup
            color="error"
            value={myDate}
            exclusive
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid rgba(233, 69, 96, 0.5) !important",
                color: "#e94560",
                backgroundColor: "initial",
              },
            }}
          >
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={allProductsAPI}
              aria-label="left aligned"
            >
              All Products
            </ToggleButton>
            
            {user.isAdmin == true &&  (
            <NavBarLink to={ROUTES.CREATE_PRODUCT}>
            <ToggleButton
              sx={{ mx: "16px !important", color: theme.palette.text.primary }}
              className="myButton"
              aria-label="right aligned"
            >
              Add Product
            </ToggleButton>
            </NavBarLink>
          
          )}
          </ToggleButtonGroup>
        </Stack>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          
            {data.filter(product => {
              if (!q) {return true;}
              return product.title.toLowerCase().includes(q);
            }).map((item) => {
              return (
                <Card
                  layout
                  key={item.id}
                  data={item}
                  sx={{
                    maxWidth: 333,
                    mt: 6,
                    ":hover .MuiCardMedia-root ": {
                      rotate: "1deg",
                      scale: "1.1",
                      transition: "0.35s",
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 277 }}
                    // @ts-ignore
                    image={item.image.url}
                    title="green iguana"
                    component="img"
                     alt={item.image.alt}
                  />

                  <CardContent>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography gutterBottom variant="h6" component="div">
                        {item.title}
                      </Typography>

                      <Typography variant="subtitle1" component="p">
                        ${item.price}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "space-between" }}>
                   {user && (
                    <Button
                      onClick={() => {
                        // handleClickOpen();
                        // AddProductToCart(item);
                        navigate(`${ROUTES.PRODUCT_INFO}/${item.id}`)

                      }}
                      sx={{ textTransform: "capitalize" }}
                      size="large"
                    >
                      <AddShoppingCartOutlinedIcon
                        sx={{ mr: 1 }}
                        fontSize="small"
                      />
                      
                    </Button>
                    )}
                     {user.isAdmin == true &&  (
                      <>
                    <IconButton
                aria-label="Delete Product"
                onClick={() => {
                  setDialog(true);
                  setIdToDelete(item.id);
                }}
            
              >
                <DeleteIcon />
              </IconButton>
                    <IconButton
                aria-label="Edit Product"
                onClick={() => navigate(`${ROUTES.EDIT_PRODUCT}/${item.id}`)}
              >
                <ModeEditIcon />
                
              </IconButton>
              </>
               ) }
                    <Rating
                      precision={0.1}
                      name="read-only"
                      defaultValue={item.rating}
                      readOnly
                    />
                  </CardActions>
                </Card>
              );
            })}
         
        </Stack>
        <ProductDeleteDialog
         isDialogOpen={isDialogOpen}
         onChangeDialog={() => setDialog(false)}
         onDelete={handleDeleteProduct}
       />
        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            sx={{
              ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
              position: "absolute",
              top: 0,
              right: 10,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>

        </Dialog>
      </Container>
       
    );
  }
 
};

export default Main;
