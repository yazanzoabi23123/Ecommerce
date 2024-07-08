import { useCallback, useEffect, useMemo, useState } from "react";
import useAxios from "../../../Users/hooks/useAxios.js";
import { useSnack } from "../../../Users/providers/SnackbarProvider.jsx";
import { useUser } from "../../../Users/providers/UserProvider.jsx";
import {
  AddProductToCart,
  RemoveProductFromCart,
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
  getMyProducts,
} from "../services/productApiService.js";
import { useSearchParams } from "react-router-dom";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useAxios();
  const snack = useSnack();
  const { user } = useUser();
  const { getproducts } = getProducts();

  

  const { q } = useSearchParams();
  const requestStatus = (loading, errorMessage, products, product = null) => {
    setLoading(loading);
    setError(errorMessage);
    setProducts(products);
    setProduct(product);
   
  };

  const handleGetProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      requestStatus(false, null, products);
      snack("success", "All the products are here!");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetMyProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getMyProducts();
      requestStatus(false, null, products);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  const handleGetProduct = useCallback(async (productId) => {
    try {
      setLoading(true);
      const product = await getProduct(productId);
      requestStatus(false, null, null, product);
      return product;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);


  const handleUpdateProduct = useCallback(async (productId, productFromClient) => {
    try {
      setLoading(true);
      const product = await editProduct(productId, productFromClient);
      requestStatus(false, null, null, product);
      snack("success", "The Product has been successfully updated");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);


  const handleAddToCart = useCallback(async (productId) => {
    try {
      const product = await AddProductToCart(productId);
      requestStatus(false, null, products, product);
      snack("success", "The Product has been Added");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);
  const handleRemoveProductFromCart = useCallback(async (productId,userId) => {
    try {
      const product = await RemoveProductFromCart(productId,userId);
      requestStatus(false, null, products, product);
      snack("success", "The Product has been deleted from Cart");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetAddedProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getProducts();
       const AddedProducts = products.filter((product) => product.cart.includes(user.id));
      //const AddedProducts = products;
      requestStatus(false, null, AddedProducts);
      return AddedProducts;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleCreateProduct = useCallback(async (productFromClient) => {
    try {
      setLoading(true);
      const product = await createProduct(productFromClient);
      requestStatus(false, null, null, product);
      snack("success", "A new Product has been created");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const value = useMemo(() => {
    return { isLoading, products, product, error/*, filterProducts*/ };
  }, [isLoading, products, product, error/*, filterProducts*/]);

  return {
    value,
    handleGetProducts,
    handleGetMyProducts,
    handleDeleteProduct,
    handleGetProduct,
    handleUpdateProduct,
    handleCreateProduct,
    handleGetAddedProducts,
    handleAddToCart,
    handleRemoveProductFromCart
  };
}
