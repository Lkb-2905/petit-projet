import { api } from './auth';

export const gamificationService = {
    getProgress: async () => {
        const response = await api.get('/intelligence/gamification/progress');
        return response.data;
    },

    simulatePoints: async (actionType: string, customPoints?: number) => {
        const response = await api.post('/intelligence/gamification/simulate', {
            action_type: actionType,
            custom_points: customPoints,
        });
        return response.data;
    },
};
