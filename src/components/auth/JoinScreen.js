import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginThunk } from "../../actions/auth";
import "./styles.css";
export const JoinScreen = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    room: "",
  });
  const { email, password, room } = formValue;

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

    dispatch(loginThunk(email, password, room));
  };

  useEffect(() => {
    if (access) {
      history.push("/chat");
    }
  }, [access, history]);

  return (
    <div className="view-auth">
      <div className="container-auth">
        <h2>JoinScreen</h2>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <div>{message}</div>}
        {!isLoading && (
          <div>
            <form onSubmit={handleSubmit}>
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
              <br />
              <br />
              <div className="padd">
                <TextField
                  label="write the room"
                  variant="outlined"
                  color="secondary"
                  name="room"
                  placeholder="write the room"
                  value={room}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="padd">
                <Button type="submit" variant="outlined" color="secondary">
                  Login
                </Button>
              </div>
            </form>

            <Link className="link padd" to="/singup">
              Don't have an account already?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
