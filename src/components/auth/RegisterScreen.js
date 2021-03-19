import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signupThunk } from "../../actions/authRegister";
import "./styles.css";
export const RegisterScreen = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    room: "",
  });

  const { username, email, password, room } = formValue;
  const dispatch = useDispatch();
  const history = useHistory();
  const access = useSelector((state) => state.auth.access);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const message = useSelector((state) => state.auth.message);

  const handleInput = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupThunk(email, username, password, room));
  };

  useEffect(() => {
    if (access) {
      history.push("/chat");
    }
  }, [access, history]);

  return (
    <div className="view-auth">
      <div className="container-auth">
        <h2>Register</h2>
        {!isLoading && <div>{message}</div>}
        {!isLoading && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="padd">
                <TextField
                  label="Name"
                  variant="outlined"
                  color="secondary"
                  name="username"
                  placeholder="Name"
                  value={username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="padd">
                <TextField
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="padd">
                <TextField
                  label="Password"
                  variant="outlined"
                  color="secondary"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInput}
                  required
                />
              </div>
              <br />

              <div className="padd">
                <TextField
                  label="Write the room"
                  variant="outlined"
                  color="secondary"
                  name="room"
                  placeholder="Write the room"
                  value={room}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="padd">
                <Button type="submit" variant="outlined" color="secondary">
                  Register
                </Button>
              </div>
            </form>
            <Link className="link padd" to="/join">
              Create and account
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
