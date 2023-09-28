import React from "react";

const PostItem = ({ post }) => {
  console.log(post);
  return (
    <div className="ui card">
      <div className="center aligned header">Content: {post.content}</div>
      <div className="center aligned description">
        <p> Decription: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Location: {post.location}</p>
      </div>
    </div>
  );
};

export default PostItem;