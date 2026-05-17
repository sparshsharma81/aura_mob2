import { useEffect, useState } from 'react';
import { fetchSuggestedUsersApi } from '@/services/api/users.api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSuggestedUsers } from '@/features/auth/authSlice';

export function useSuggestedUsers() {
  const dispatch = useAppDispatch();
  const suggestedUsers = useAppSelector((state) => state.auth.suggestedUsers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchSuggestedUsersApi();
        if (mounted && data?.users) {
          dispatch(setSuggestedUsers(data.users));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return { suggestedUsers, loading };
}
