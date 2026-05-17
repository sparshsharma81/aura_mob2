import { useEffect, useState } from 'react';
import { fetchCommentsApi } from '@/services/api/posts.api';

export function usePost(postId?: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchCommentsApi(postId);
        if (mounted && data?.comments) {
          setComments(data.comments);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [postId]);

  return { comments, loading, setComments };
}
