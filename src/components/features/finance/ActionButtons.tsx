'use client';

import React, { useState } from 'react';
import { Plus, Send, RefreshCw, MoreHorizontal } from 'lucide-react';
import { DepositModal } from './DepositModal';

export const ActionButtons: React.FC = () => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <button
                    onClick={() => setIsDepositOpen(true)}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Plus size={24} />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Ajouter</span>
                </button>

                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Send size={24} />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Envoyer</span>
                </button>

                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <RefreshCw size={24} />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Échanger</span>
                </button>

                <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <MoreHorizontal size={24} />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Plus</span>
                </button>
            </div>

            <DepositModal
                isOpen={isDepositOpen}
                onClose={() => setIsDepositOpen(false)}
                onSuccess={() => {
                    // Ideally invalidate query here to refresh balance
                    window.location.reload();
                }}
            />
        </>
    );
};
