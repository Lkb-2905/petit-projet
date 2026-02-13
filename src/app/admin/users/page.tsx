'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api/auth';
import { Search, MoreVertical, Shield, Ban, CheckCircle } from 'lucide-react';

interface User {
    id: string;
    email: string;
    username: string;
    role: string;
    citizenship_tier: string;
    is_active: boolean;
    created_at: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBanToggle = async (user: User) => {
        if (confirm(`Êtes-vous sûr de vouloir ${user.is_active ? 'bannir' : 'débannir'} ${user.username} ?`)) {
            try {
                const endpoint = user.is_active ? 'ban' : 'unban';
                await api.post(`/admin/users/${user.id}/${endpoint}`);
                fetchUsers(); // Refresh list
            } catch (err) {
                console.error("Action failed", err);
                alert("Erreur lors de l'action");
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Gestion des Citoyens</h1>
                    <p className="text-gray-400">Gérer les accès et statuts des utilisateurs.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 w-64 transition-all focus:w-80"
                    />
                </div>
            </header>

            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm font-medium uppercase">
                        <tr>
                            <th className="px-6 py-4">Utilisateur</th>
                            <th className="px-6 py-4">Rôle</th>
                            <th className="px-6 py-4">Tier</th>
                            <th className="px-6 py-4">Statut</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Chargement...</td></tr>
                        ) : filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                            {user.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{user.username}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${user.role === 'admin'
                                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                            : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${user.citizenship_tier === 'vibranium'
                                            ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                            : user.citizenship_tier === 'gold'
                                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                        }`}>
                                        {user.citizenship_tier.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.is_active ? (
                                        <div className="flex items-center gap-2 text-green-500 text-sm">
                                            <CheckCircle size={16} /> Actif
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <Ban size={16} /> Banni
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleBanToggle(user)}
                                        className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        title={user.is_active ? "Bannir" : "Débannir"}
                                    >
                                        <Shield size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
