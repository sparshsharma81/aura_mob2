import { useEffect, useState } from 'react';
import { fetchMessagesApi } from '@/services/api/chat.api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMessages } from '@/features/chat/chatSlice';

export function useMessages(userId?: string) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMessagesApi(userId);
        if (mounted && data?.messages) {
          dispatch(setMessages(data.messages));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch, userId]);

  return { messages, loading };
}
