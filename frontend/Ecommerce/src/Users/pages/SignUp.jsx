import initialSignupForm from "../helpers/initialForms/initialSignupForm.js";
import useForm from "../hooks/useForm";
import useUsers from "../hooks/useUsers.js";
import signupSchema from "../models/signupSchema";
import { useUser } from "../providers/UserProvider";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container, Stack, Typography } from "@mui/material";
import initialSignInForm from "../helpers/initialForms/initialSignInForm.js";
import loginSchema from "../models/loginSchema";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth-form-container.css";
import Form from "../../Users/components/Form.jsx";
import Input from "../../Users/components/Input.jsx";
import UserForm from "../../Users/components/UserForm.jsx";
export default function SignnUp() {
  let [authMode, setAuthMode] = useState("signin");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const { handleSignup, handleLogin } = useUsers();

  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup
  );

  const { value: value2, ...rest2 } = useForm(
    initialSignInForm,
    loginSchema,
    handleLogin
  );
  const navigate = useNavigate();

  const { user } = useUser();
  console.log(user);
  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  if (authMode === "signin") {
    return (
    
      
      <Container
        sx={{
          paddingTop: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom:21
        }}
      >
        <Form
          title="login"
          styles={{ maxWidth: "450px" }}
          to={ROUTES.ROOT}
          onSubmit={rest2.onSubmit}
          onReset={rest2.handleReset}
          onChange={rest2.validateForm}
        >
          <Input
            label="email"
            name="email"
            type="email"
            error={value2.errors.email}
            onChange={rest2.handleChange}
            data={value2.data}
          />
          <Input
            label="password"
            name="password"
            type="password"
            error={value2.errors.password}
            onChange={rest2.handleChange}
            data={value2.data}
          />
      <div className="text-center" >
       <span className="color">Not registered yet? </span>
       <span className="link-primary" onClick={changeAuthMode}>
         Sign Up
       </span>
       </div>
        </Form>
       
      </Container>
     
    );
  }

  return (
    <Container
    sx={{
      paddingTop: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <UserForm
      onSubmit={rest.onSubmit}
      onReset={rest.handleReset}
      onFormChange={rest.validateForm}
      title="register form"
      errors={value.errors}
      data={value.data}
      onInputChange={rest.handleChange}
      setData={rest.setData}
     
     />      
  </Container>
  
  );
 
}
