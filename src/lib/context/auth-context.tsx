'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: any;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authService.getMe(token)
                .then(setUser)
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (data: any) => {
        const response = await authService.login(data);
        localStorage.setItem('token', response.access_token);
        const userData = await authService.getMe(response.access_token);
        setUser(userData);
        router.push('/dashboard');
    };

    const register = async (data: any) => {
        await authService.register(data);
        // After register, auto login or redirect to login
        await login({ email: data.email, password: data.password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading: isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
