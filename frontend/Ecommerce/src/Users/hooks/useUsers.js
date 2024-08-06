import { useState, useCallback, useMemo } from "react";
import { getUserData, login, signup , EditUser} from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import useAxios from "./useAxios";
import { useSnack } from "../../Users/providers/SnackbarProvider";

const useUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  const snack = useSnack();

  useAxios();

  const requestStatus = useCallback(
    (loading, errorMessage, user = null) => {
      setLoading(loading);
      setUser(user);
      setError(errorMessage);
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user) => {
      try {
        
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, userFromLocalStorage);
        navigate(ROUTES.ROOT);
      } catch (error) {
        requestStatus(false, error, null);

      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback((userFromClient) => {
    const fn  = async () => {
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signup(normalizedUser);
        await handleLogin({
          email: userFromClient.email,
          password: userFromClient.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    }
     fn();   
  },
    [requestStatus, handleLogin]
  );
 const handleEditUser = useCallback(
      async(UpdateUser)=>{
        try{
          const normalizedUser = normalizeUser(UpdateUser);
        await EditUser(normalizedUser,user.id);
        snack("success", "The User has been Updated");

        }
        catch (error) {
          requestStatus(false, error, null);
        }
      },
      []
    );
 

  const value = useMemo(
    () => ({ isLoading, error, user }),
    [isLoading, error, user]
  );

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
    handleEditUser,
  };
};

export default useUsers;
