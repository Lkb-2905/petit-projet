'use client';

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
    id: string;
    type: 'CREDIT' | 'DEBIT';
    amount: number;
    description: string;
    date: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading }) => {
    if (isLoading) {
        return <div className="p-4 text-center text-gray-500 animate-pulse">Chargement des transactions...</div>;
    }

    if (transactions.length === 0) {
        return <div className="p-8 text-center text-gray-500">Aucune transaction récente.</div>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white px-1">Activités Récentes</h3>
            <div className="space-y-2">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "p-2 rounded-full",
                                tx.type === 'CREDIT' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                            )}>
                                {tx.type === 'CREDIT' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-medium text-white">{tx.description}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {new Date(tx.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className={cn(
                            "font-bold font-mono",
                            tx.type === 'CREDIT' ? "text-green-500" : "text-white"
                        )}>
                            {tx.type === 'CREDIT' ? '+' : '-'}{tx.amount.toLocaleString()} XAF
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
