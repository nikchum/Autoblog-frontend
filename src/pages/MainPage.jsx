import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPopularPosts, getPosts } from 'redux/features/posts/postsSelectors';
import { getAllPosts } from 'redux/features/posts/postsOperations';

import { PopularPosts } from 'components/PopularPosts';
import { PostItem } from 'components/PostItem';

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
    <main className="mx-auto max-w-[900px] py-10">
      <div className="flex justify-between gap-8">
        <ul className="flex basis-4/5 flex-col gap-8">
          {posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </ul>
        <div className="basis-1/5 ">
          <ul className="text-center  text-lg text-white">
            Popular:
            {popularPosts?.map((post, idx) => (
              <PopularPosts key={idx} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
