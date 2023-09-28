import React, { useState } from "react";
import { registerUser, login } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const AccountForm = ({ token, setToken }) => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChangeHandler = (event) => setUsername(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const authFn = action === "register" ? registerUser : login;
    const result = await authFn(username, password);
    console.log(result, "result");
    setToken(result.data.token);
    if (result.data.token) {
      navigate("/");
    }
  };

  const title = action === "login" ? "Log In" : "Sign Up";
  return (
    <div>
      <form onSubmit={onSubmitHandler} className="ui form">
        <h1>{title}</h1>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className="field">
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={passwordChangeHandler}
            minLength="8"
          />
        </div>
        <button className="ui button" type="submit">
          {title}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;