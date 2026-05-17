import { useEffect, useState } from 'react';
import { fetchPostsApi } from '@/services/api/posts.api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPosts } from '@/features/posts/postSlice';

export function useFeed() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPostsApi();
        if (mounted && data?.posts) {
          dispatch(setPosts(data.posts));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return { posts, loading, refresh: async () => dispatch(setPosts((await fetchPostsApi()).posts || [])) };
}
