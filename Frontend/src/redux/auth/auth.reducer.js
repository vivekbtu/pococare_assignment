import { LOGIN, LOGOUT } from "./auth.types";


const initState = {
 isAuth:false,
 token:""
};
export const authReducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        isAuth:true,
        token:payload
      };
    }
    case LOGOUT: {
        return {
          ...state,
          isAuth:false,
          token:""
        };
      }
    
    default: {
      return state;
    }
  }
};
