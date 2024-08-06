import axios from "axios";
import { useEffect } from "react";
import { useSnack } from "../providers/SnackbarProvider";
import { useUser } from "../providers/UserProvider";
export default function useAxios() {
  const snack = useSnack();
  const { token } = useUser();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    console.log("out");
    const requestInterceptor = axios.interceptors.request.use((data) => {
      console.log("in");
      return Promise.resolve(data);
    }, );

    const responseInterceptor = axios.interceptors.response.use(
      null,
      (error) => {
        if (error.response.status === 401) {
          snack("error", "Email or Password are wrong");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
       axios.interceptors.response.eject(responseInterceptor);
    };
  }, [snack, token]);
}
