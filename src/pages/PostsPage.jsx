import { useEffect, useState } from 'react';

import { PostItem } from 'components/PostItem';

import axios from '../utils/axios';

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <ul className="mx-auto flex w-2/3 flex-col gap-10 py-10">
      {posts?.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};
