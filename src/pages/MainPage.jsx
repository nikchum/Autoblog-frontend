import { PopularPosts } from 'components/PopularPosts';
import { PostItem } from 'components/PostItem';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from 'redux/features/posts/postsOperations';
import { getPopularPosts, getPosts } from 'redux/features/posts/postsSelectors';

export const MainPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const popularPosts = useSelector(getPopularPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return <div className="py-10 text-center text-xl text-white">No posts</div>;
  }

  return (
    <div className="mx-auto max-w-[900px] py-10">
      <div className="flex justify-between gap-8">
        <ul className="flex basis-4/5 flex-col gap-10">
          {posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </ul>
        <div className="basis-1/5 ">
          <ul className="text-xs uppercase text-white">
            Popular:
            {popularPosts?.map((post, idx) => (
              <PopularPosts key={idx} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
