import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { fetchPosts } from "./api";
import PostList from "./components/PostList";
import Home from "./components/Home";
import AccountForm from "./components/AccountForm";

function App() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetchPosts();
      setPosts(result.data.posts);
    };
    getPosts();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logOut = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/posts">
          Posts
        </Link>
        <div className="right menu">
          {token ? (
            <button className="item" onClick={logOut}>
              Log Out
            </button>
          ) : (
            <>
              <Link className="item" to="account/login">
                Login
              </Link>
              <Link className="item" to="account/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList posts={posts} />} />
        <Route
          path="/account/:action"
          element={<AccountForm token={token} setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;