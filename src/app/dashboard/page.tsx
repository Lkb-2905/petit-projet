'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { gamificationService } from '@/lib/api/gamification';
import { TierProgress } from '@/components/features/gamification/TierProgress';
import { financeService } from '@/lib/api/finance';
import { useAuth } from '@/lib/context/auth-context';
import { WalletCard } from '@/components/features/finance/WalletCard';
import { TransactionList } from '@/components/features/finance/TransactionList';
import { ActionButtons } from '@/components/features/finance/ActionButtons';

export default function DashboardPage() {
    const { user, loading: isAuthLoading } = useAuth();

    // Fetch Wallet Data
    const { data: wallet, isLoading: isWalletLoading } = useQuery({
        queryKey: ['walletBalance'],
        queryFn: financeService.getBalance,
        enabled: !!user,
    });

    // Fetch Gamification Progress
    const { data: progress } = useQuery({
        queryKey: ['gamificationProgress'],
        queryFn: gamificationService.getProgress,
        enabled: !!user,
    });

    // Mock Transactions
    const mockTransactions = [
        { id: '1', type: 'CREDIT', amount: 25000, description: 'Dépôt Mobile Money', date: '2026-05-12' },
        { id: '2', type: 'DEBIT', amount: 1500, description: 'Abonnement Empire TV', date: '2026-05-14' },
        { id: '3', type: 'DEBIT', amount: 5000, description: 'Transfert à @franck', date: '2026-05-15' },
    ] as any[];

    if (isAuthLoading) return <div className="p-8 text-center">Chargement du profil...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <header className="mb-8 pt-4">
                <h1 className="text-2xl font-bold">Bonjour, {user?.profile?.username || 'Citoyen'}</h1>
                <p className="text-gray-400 text-sm">Prêt pour conquérir l'Empire ?</p>
            </header>

            <main className="max-w-md mx-auto space-y-6">
                {/* Gamification Progress */}
                {progress && (
                    <TierProgress
                        currentTier={progress.current_tier}
                        currentScore={progress.current_score}
                        nextTier={progress.next_tier}
                        pointsNeeded={progress.points_needed}
                        progressPercent={progress.progress_percent}
                    />
                )}

                {/* Wallet Card */}
                <WalletCard
                    balance={wallet?.balance || 0}
                    currency={wallet?.currency || 'XAF'}
                    tier={user?.role === 'admin' ? 'Vibranium' : 'Iron'}
                />

                {/* Quick Actions */}
                <ActionButtons />

                {/* Transactions */}
                <TransactionList
                    transactions={mockTransactions}
                    isLoading={isWalletLoading}
                />
            </main>
        </div>
    );
}
