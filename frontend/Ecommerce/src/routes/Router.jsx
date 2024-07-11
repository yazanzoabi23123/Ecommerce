import SignUp from "../Users/pages/SignUp";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import Main from "../components/main/Main";
import ProductDetails from "../components/main/ProductDetails";
import CartPage from "../components/main/CartPage";
import App from "../App";
import Main2 from "../components/main/Main2";
import CreatProduct from "../components/main/CreatProduct";
import EditProduct from "../components/main/EditProduct";
import Profile from "../Users/pages/Profile";
import EditUser from "../Users/pages/EditUser";

export default function Router(){
return(
      
 <Routes>
      <Route path={ROUTES.ROOT} element={<Main2/>}/>
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={`${ROUTES.PRODUCT_INFO}/:id`} element={<ProductDetails />} />
      <Route path={ROUTES.CART} element={<CartPage/>} />
      <Route path={ROUTES.CREATE_PRODUCT} element={<CreatProduct/>} />
      <Route path={`${ROUTES.EDIT_PRODUCT}/:id`} element={<EditProduct/>} />
      <Route path={ROUTES.USER_PROFILE} element={<Profile />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUser />} />
</Routes> 
);

}