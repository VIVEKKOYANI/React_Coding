import React, { useState } from 'react';
import ListPosts from './component/ListPosts';
import PostDetails from './component/PostDetails';

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  console.log("selectedPost", selectedPost);

  return (
    <div>
      <ListPosts onSelect={handlePostSelect} />
      {selectedPost && <PostDetails post={selectedPost} />}
    </div>
  );
};

export default App;
