import React, { useState } from "react";
import Post from "./Post";

const Main = () => {
  const [posts, setPosts] = useState([
    {
      username: "ChristianNwamba",
      caption: "Some caption",
      image:
        "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      username: "KolaTioluwani",
      caption: "Some caption",
      image:
        "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ]);

  return (
    <div className="wrapper">
      <div className="w-40">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V603wWEsxxQTXxVVVmE2mzDdfNEP-EIZdvXCmmuIMQ&s"
          alt="Instagram Font Logo White Png - Instagram White Text@pngkey.com"
        />
      </div>
      <h1>Instagram Stories</h1>
      <div>
        {posts?.map((post, idx) => (
          <Post
            userName={post?.username}
            caption={post?.caption}
            imageUrl={post?.image}
            key={`OII83_${idx}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
