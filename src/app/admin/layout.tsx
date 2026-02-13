'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Settings, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, loading } = useAuth();

    // Protect the route
    React.useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            window.location.href = '/dashboard';
        }
    }, [user, loading]);

    if (loading || !user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                Loading Admin Access...
            </div>
        );
    }

    const navItems = [
        { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
        { name: 'Utilisateurs', href: '/admin/users', icon: Users },
        { name: 'Finances', href: '/admin/finance', icon: CreditCard },
        { name: 'Paramètres', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center gap-2 text-red-500">
                    <ShieldAlert size={24} />
                    <span className="font-bold text-lg tracking-wider">GOD MODE</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-red-500/10 text-red-500'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{user.username}</span>
                            <span className="text-xs text-red-400">Administrateur</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
