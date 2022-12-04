import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
function App() {
  const [issignup, setIssignup] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  console.log(localStorage.getItem("userId"));
  return (
    <>
      <header>
        <Header issignup={issignup} setIssignup={setIssignup} />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route
              path="/auth"
              element={<Auth issignup={issignup} setIssignup={setIssignup} />}
            />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
