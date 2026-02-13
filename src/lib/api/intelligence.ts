import { api } from './auth';

export const intelligenceService = {
  getFeed: async () => {
    const response = await api.get('/intelligence/feed');
    return response.data;
  },

  trackInteraction: async (mediaId: string, type: 'VIEW' | 'LIKE' | 'SKIP', watchTime: number = 0) => {
    const response = await api.post('/intelligence/interact', {
      media_id: mediaId,
      type: type,
      watch_time: watchTime
    });
    return response.data;
  }
};
