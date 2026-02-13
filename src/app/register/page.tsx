'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register({ email, password, username, referral_code: referralCode });
        } catch (err: any) {
            setError("Erreur lors de l'inscription. L'email est peut-être déjà pris.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/40 via-black to-purple-900/20" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

            <div className="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tighter mb-2">REJOINDRE</h1>
                    <p className="text-gray-400">Devenez citoyen de l'Empire 2076.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nom de Citoyen</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="Neo_237"
                            required
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Code de Parrainage (Optionnel)</label>
                        <input
                            type="text"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="EMP-XXXX"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-gray-200"
                        disabled={loading}
                    >
                        {loading ? 'Création du compte...' : "S'inscrire"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Déjà citoyen ?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}
