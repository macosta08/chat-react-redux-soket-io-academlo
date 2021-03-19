import axios from "axios";
import { types } from "../types/types";

export const login = (room) => ({
  type: types.login,
  payload: room,
});

export const loginSuccess = (auth) => ({
  type: types.loginSuccess,
  payload: auth,
});

export const loginFail = (err) => ({
  type: types.loginFail,
  payload: err,
});

export const loginThunk = (email, password, room) => {
  return (dispatch) => {
    dispatch(login(room));

    return axios
      .post("https://academlo-chat.herokuapp.com/api/users/login", {
        email,
        password,
      })
      .then((res) => dispatch(loginSuccess(res.data)))
      .catch((err) => dispatch(loginFail(err)));
  };
};
