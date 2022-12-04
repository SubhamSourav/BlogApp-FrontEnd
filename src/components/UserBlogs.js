import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const id = localStorage.getItem("userId");
  console.log(id);
  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div>
      {user &&
        user.map((blog, idx) => (
          <Blog
            id={blog._id}
            key={idx}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
