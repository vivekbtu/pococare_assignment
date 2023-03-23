
// Dispatcher

import axios from "axios";
import { LOGIN, LOGOUT } from "./auth.types";

export const LogIn = (creds) => async (dispatch) => {
  const { data } = await axios.post(`https://poco-care-assignment.onrender.com/user/login`,creds);
  return dispatch({
    type: LOGIN,
    payload: data.token,
    token: localStorage.setItem("userToken",data.token)
  });
};

export const LogOut = () => ({ type: LOGOUT})
