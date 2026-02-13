'use client';

import React from 'react';
import { GodModeHeader } from '@/components/features/admin/GodModeHeader';
import { KPIWidgets } from '@/components/features/admin/KPIWidgets';
import { CityMap } from '@/components/features/admin/CityMap';
import { IntelligenceFeed } from '@/components/features/admin/IntelligenceFeed';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col font-sans selection:bg-blue-500/30">
            {/* 1. Header (Indicateur de Pouvoir) */}
            <GodModeHeader />

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* Main Content (God Mode Map & Widgets) */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
                        {/* 2. Section Principale : La Vue "God Mode" */}
                        <section className="relative">
                            <div className="flex justify-between items-end mb-2 px-2">
                                <h2 className="text-sm font-bold text-blue-400 tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                    VUE SATELLITE TACTIQUE
                                </h2>
                                <span className="text-[10px] text-gray-500 font-mono">DOUALA SECTOR 4</span>
                            </div>
                            <CityMap />
                        </section>

                        {/* 3. Widgets de Performance */}
                        <section>
                            <div className="flex justify-between items-end mb-2 px-2">
                                <h2 className="text-sm font-bold text-purple-400 tracking-wider">
                                    MÉTRIQUES "SUMMUM"
                                </h2>
                            </div>
                            <KPIWidgets />
                        </section>
                    </div>
                </div>

                {/* 4. Le Feed d'Intelligence (L'Assistant Stratégique) */}
                <div className="w-full md:w-96 border-l border-white/5 bg-black/20 backdrop-blur-sm z-20">
                    <IntelligenceFeed />
                </div>
            </div>

            {/* Background Ambient Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}
