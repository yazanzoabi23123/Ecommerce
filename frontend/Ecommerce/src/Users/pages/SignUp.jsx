import initialSignupForm from "../helpers/initialForms/initialSignupForm.js";
import useForm from "../hooks/useForm";
import useUsers from "../hooks/useUsers.js";
import signupSchema from "../models/signupSchema";
import { useUser } from "../providers/UserProvider";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Input, Stack, Typography } from "@mui/material";
import initialSignInForm from "../helpers/initialForms/initialSignInForm.js";
import loginSchema from "../models/loginSchema";
import useForm2 from "../hooks/useForm2.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth-form-container.css";
import NavBarLink from "../../routes/components/NavBarLink.jsx";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Footer from "../../components/footer/footer.jsx";
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

  const { value2, ...rest2 } = useForm2(
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
      <div
        className="Auth-form-container"
        to={ROUTES.ROOT}
        onReset={rest2.handleReset}
        onChange={rest2.validateForm}
      >
        <form className="Auth-form" onSubmit={rest2.onSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              <span className="color">Not registered yet? </span>
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <Input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
                error={value2.errors.email ? true : false}
                onChange={rest2.handleChange}
                data={value2.data}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <Input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                error={value2.errors.password ? true : false}
                onChange={rest2.handleChange}
                data={value2.data}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <NavBarLink to={ROUTES.ROOT}>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => e.preventDefault()}
                onSubmit={rest.onSubmit}

              >
                Submit
              </button>
              </NavBarLink>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className="Auth-form-container"
      onSubmit={rest.onSubmit}
      onReset={rest.handleReset}
      onChange={rest.validateForm}
    >
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            <span className="color">Not registered yet? </span>
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <Input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              error={value.errors.email}
              onChange={rest.handleChange}
              data={value.data}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <Input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              error={value.errors.password}
              onChange={rest.handleChange}
              data={value.data}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <Input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              error={value.errors.password}
              onChange={rest.handleChange}
              data={value.data}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
 
}
