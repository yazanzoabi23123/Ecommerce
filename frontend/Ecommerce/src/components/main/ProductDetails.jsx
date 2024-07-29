/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useGetproductByNameQuery } from "../../Redux/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import useProducts from "../main/hooks/useProducts";
import { getProduct } from "./services/productApiService";

const ProductDetails = () => {
  const {handleGetProduct,handleAddToCart} = useProducts();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const loader = async () => {
      const product = await handleGetProduct(id);
      setProduct(product);
    }
    loader();
  }, [])



  if (!product) {
    return <></>;
  }
  
    return (
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          flexDirection: { xs: "column", sm: "row" },
          marginBottom:"12%"
        }}
      >
        <Box sx={{ display: "flex" }}>
        <img
          width={360}
          src={
            `${product.image
            .url}`
          }
          alt=""
        />
      </Box>

        <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h5">{product.title}</Typography>
          <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
            ${product.price}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>

          <Stack
            sx={{ justifyContent: { xs: "center", sm: "left" } }}
            direction={"row"}
            gap={1}
            my={2}
          >
          
          </Stack>

          <Button
            sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
            variant="contained"
            onClick={()=>handleAddToCart(id)}
          >
            <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
            Buy now
          </Button>
        </Box>
      </Box>
      
    );
  
};

export default ProductDetails;
