import { useEffect, useState } from 'react';

import { PostItem } from 'components/PostItem';
import { Loader } from 'components/Loader';

import axios from '../utils/axios';

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchUserPosts = async () => {
    try {
      setisLoading(true);
      const { data } = await axios.get('/posts/user');
      setPosts(data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!posts.length) {
    return <div className="py-10 text-center text-xl text-white">No posts</div>;
  }

  return (
    <ul className="mx-auto flex max-w-[768px] flex-col gap-10 py-10">
      {posts?.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};
