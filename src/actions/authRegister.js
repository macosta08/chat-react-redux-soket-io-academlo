import axios from "axios";
import { types } from "../types/types";

export const signup = (room) => ({
  type: types.signup,
  payload: room,
});

export const signupSuccess = (auth) => ({
  type: types.signupSuccess,
  payload: auth,
});

export const signupFail = (err) => ({
  type: types.signupFail,
  payload: err,
});

export const signupThunk = (email, username, password, room) => {
  return (dispatch) => {
    dispatch(signup(room));

    return axios
      .post("https://academlo-chat.herokuapp.com/api/users/signup", {
        email,
        username,
        password,
      })
      .then(async (res) => await dispatch(signupSuccess(res.data)))
      .catch((err) => signupFail(err));
  };
};
