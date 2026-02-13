'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login({ username: email, password });
        } catch (err: any) {
            setError('Identifiants invalides');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-black to-blue-900/20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

            <div className="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tighter mb-2">EMPIRE 2076</h1>
                    <p className="text-gray-400">Accédez à votre citoyenneté numérique.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="citoyen@empire.cm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-gray-200"
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se Connecter'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Pas encore citoyen ?{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Rejoindre l'Empire
                    </Link>
                </div>
            </div>
        </div>
    );
}
