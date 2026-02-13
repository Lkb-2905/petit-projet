'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

interface WalletCardProps {
    balance: number;
    currency: string;
    tier: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({ balance, currency, tier }) => {
    return (
        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 text-white shadow-2xl overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10">
                <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                    Solde Principal
                </CardTitle>
                <Wallet className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="z-10 relative">
                <div className="text-4xl font-bold tracking-tighter">
                    {balance.toLocaleString('fr-CM')} <span className="text-lg text-primary">{currency}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="px-2 py-1 rounded-full bg-white/10 text-xs font-semibold border border-white/10 backdrop-blur-md">
                        Tier: <span className="text-yellow-500 uppercase">{tier}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                        IBAN: EMPIRE76...9092
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
