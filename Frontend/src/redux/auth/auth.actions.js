
// Dispatcher
import Swal from "sweetalert2"
import axios from "axios";
import { LOGIN, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT } from "./auth.types";

export const LogIn = (creds) => async (dispatch) => {
  // const { data } = await axios.post(`https://poco-care-assignment.onrender.com/user/login`,creds);
  // return dispatch({
  //   type: LOGIN,
  //   payload: data.token,
  //   token: localStorage.setItem("userToken",data.token)
  // });

  dispatch({
    type: LOGIN_REQUEST
  });

  try {
    const { data } = await axios.post(`https://poco-care-assignment.onrender.com/user/login`, creds);
    console.log(data);

    Swal.fire({
      icon: 'success',
      title: data.message
    })
    return dispatch({
      type: LOGIN,
      payload: data.token,
      token: localStorage.setItem("userToken", data.token)
    });
  }
  catch ({ response: { data: { message } } }) {
    console.log(message);
    Swal.fire({
      icon: 'error',
      title: message
    })
    return dispatch({
      type: LOGIN_ERROR,
      payload: message,
    });

  }
};

export const LogOut = () => ({ type: LOGOUT })
