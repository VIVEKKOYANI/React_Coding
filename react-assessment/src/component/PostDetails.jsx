import React from 'react';

const PostDetails = ({ post }) => {
  // const handleSelect = useCallback(() => {
  //   onSelect(post);
  // }, [post, onSelect]);

  return (
    <div>
      <h2>Post Details</h2>
      <p>ID: {post.id}</p>
      <p>Title: {post.title}</p>
      {/* <button onClick={handleSelect}>View Details</button> */}
    </div>
  );
};

export default PostDetails;
