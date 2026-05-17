import { useEffect, useState } from 'react';
import { fetchUserProfileApi } from '@/services/api/users.api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUserProfile } from '@/features/auth/authSlice';

export function useUserProfile(userId?: string) {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.auth.userProfile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfileApi(userId);
        if (mounted && data?.user) {
          dispatch(setUserProfile(data.user));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch, userId]);

  return { userProfile, loading };
}
