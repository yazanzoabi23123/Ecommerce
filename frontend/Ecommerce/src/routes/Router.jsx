// import LoginPage from "../Users/pages/LoginPage";
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

export default function Router(){
return(
      
 <Routes>
      <Route path={ROUTES.ROOT} element={<Main2/>}/>
     {/* <Route path={ROUTES.LOGIN} element={<LoginPage />}    */}
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      <Route path={`${ROUTES.PRODUCT_INFO}/:id`} element={<ProductDetails />} />
      <Route path={ROUTES.CART} element={<CartPage/>} />
      <Route path={ROUTES.CREATE_PRODUCT} element={<CreatProduct/>} />
      <Route path={`${ROUTES.EDIT_PRODUCT}/:id`} element={<EditProduct/>} />
</Routes> 
);

}