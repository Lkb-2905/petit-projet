'use client';

import React, { useEffect, useState } from 'react';
import { Users, Coins, Activity, TrendingUp } from 'lucide-react';
import { api } from '@/lib/api/auth';

interface Stats {
    total_users: number;
    active_users: number;
    total_funds: number;
    currency: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-white">Chargement des données impériales...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Tableau de Bord Impérial</h1>
                <p className="text-gray-400">Vue d'ensemble de l'Empire en temps réel.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Citizens */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-500">
                            <Users size={24} />
                        </div>
                        <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp size={12} /> +12%
                        </span>
                    </div>
                    <div className="space-y-1 relative z-10">
                        <h3 className="text-gray-400 text-sm font-medium">Citoyens Total</h3>
                        <p className="text-3xl font-bold text-white">{stats?.total_users.toLocaleString()}</p>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
                </div>

                {/* Treasury */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-500">
                            <Coins size={24} />
                        </div>
                    </div>
                    <div className="space-y-1 relative z-10">
                        <h3 className="text-gray-400 text-sm font-medium">Trésorerie Globale</h3>
                        <p className="text-3xl font-bold text-white">
                            {stats?.total_funds.toLocaleString()} <span className="text-lg text-gray-500">{stats?.currency}</span>
                        </p>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all" />
                </div>

                {/* Active Users */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-purple-500/20 text-purple-500">
                            <Activity size={24} />
                        </div>
                    </div>
                    <div className="space-y-1 relative z-10">
                        <h3 className="text-gray-400 text-sm font-medium">Citoyens Actifs</h3>
                        <p className="text-3xl font-bold text-white">{stats?.active_users.toLocaleString()}</p>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
                </div>
            </div>
        </div>
    );
}
