import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  console.log("I am in PostList Component", posts);
  return (
    <div>
      {posts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostList;