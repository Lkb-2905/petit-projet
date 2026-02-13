import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface Creator {
    username: string;
    avatar_url?: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    file_url: string;
    thumbnail_url?: string;
    creator: Creator;
    likes_count: number;
    comments_count: number;
    views_count: number;
}

export const mediaService = {
    getFeed: async (): Promise<Video[]> => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`${API_URL}/media/feed`, { headers });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch feed", error);
            return [];
        }
    },

    uploadVideo: async (file: File, title: string, description: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/media/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};
