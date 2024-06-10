import React, { useState, useEffect, useMemo } from 'react';
import { useCallback } from 'react';

const ListPosts = ({ onSelect }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const computeDetails = useMemo(() => {
    return (post) => {
      // Simulating heavy computation
      const result = post.title.toUpperCase();
      console.log('Heavy computation for post', post.id);
      return result;
    };
  }, []);

  const handleSelect = useCallback((post) => {
    onSelect(post);
  }, []);

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
            <p>Computed Details: {computeDetails(post)}</p>
            <button onClick={() => handleSelect(post)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPosts;
