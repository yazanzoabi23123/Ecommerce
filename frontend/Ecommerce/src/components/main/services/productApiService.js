import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "https://localhost:7238/api";
console.log(apiUrl);
//const { user } = useUser();

export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyProducts = async () => {
  console.log("get my products");
  try {
    const response = await axios.get(`${apiUrl}/products/my-products`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createProduct = async (product) => {
  try {
    const { data } = await axios.post(`${apiUrl}/products`, product);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

 export const editProduct = async (productId, normalaizedProduct) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/products/${productId}`,
       normalaizedProduct
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const  AddProductToCart = async (productId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  };

};
export const RemoveProductFromCart = async (productId,userId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/products/${productId}/removeproductfromcart/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
