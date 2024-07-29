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
import CartPage2 from "./../components/main/NavBar/CartPage2";
import ProductDetails2 from "./../components/main/NavBar/ProductDetails2";
import EditProduct2 from "./../components/main/NavBar/EditProduct2";
import CreatProduct2 from "./../components/main/NavBar/CreatProduct2";
import Profile2 from "../Users/NavBar/Profile2";
import SignUp2 from "../Users/NavBar/SignUp2";
import EditUser2 from "../Users/NavBar/EditUser2";

export default function Router(){
return(
      
 <Routes>
      <Route path={ROUTES.ROOT} element={<Main2/>}/>
      <Route path={ROUTES.SIGNUP} element={<SignUp2 />} />
      <Route path={`${ROUTES.PRODUCT_INFO}/:id`} element={<ProductDetails2 />} />
      <Route path={ROUTES.CART} element={<CartPage2/>} />
      <Route path={ROUTES.CREATE_PRODUCT} element={<CreatProduct2/>} />
      <Route path={`${ROUTES.EDIT_PRODUCT}/:id`} element={<EditProduct2/>} />
      <Route path={ROUTES.USER_PROFILE} element={<Profile2 />} />
      <Route path={ROUTES.EDIT_USER} element={<EditUser2 />} />
</Routes> 
);

}