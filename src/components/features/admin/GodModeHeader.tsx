import React, { useEffect, useState } from 'react';
import { BatteryCharging, Users, TrendingUp, Zap } from 'lucide-react';

export const GodModeHeader = () => {
    const [rtr, setRtr] = useState(25450);
    const [energy, setEnergy] = useState(115);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setRtr(prev => prev + Math.floor(Math.random() * 500) - 200);
            setEnergy(prev => Math.min(120, Math.max(90, prev + (Math.random() > 0.5 ? 0.1 : -0.1))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-black/80 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <Zap className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-widest">EMPIRE NEXUS</h1>
                        <span className="text-xs text-blue-400 font-mono tracking-wider">SYSTEM LEVEL: GOD MODE</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-6 divide-x divide-white/10">
                    <div className="px-4 text-center">
                        <span className="text-xs text-gray-400 block mb-1">REVENU TEMPS RÉEL (RTR)</span>
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-green-400" />
                            <span className="text-2xl font-mono font-bold text-white">
                                {rtr.toLocaleString('fr-FR')} <span className="text-sm text-gray-500">FCFA/min</span>
                            </span>
                        </div>
                    </div>

                    <div className="px-4 text-center hidden md:block">
                        <span className="text-xs text-gray-400 block mb-1">CITOYENS ACTIFS</span>
                        <div className="flex items-center gap-2 justify-center">
                            <Users size={16} className="text-blue-400" />
                            <span className="text-xl font-mono font-bold text-white">12,402</span>
                        </div>
                    </div>

                    <div className="px-4 text-center pl-6">
                        <span className="text-xs text-gray-400 block mb-1">STATUT ÉNERGÉTIQUE</span>
                        <div className="flex items-center gap-2 justify-center">
                            <BatteryCharging size={16} className={energy > 100 ? "text-yellow-400" : "text-green-400"} />
                            <span className={`text-xl font-mono font-bold ${energy > 100 ? "text-yellow-400" : "text-green-400"}`}>
                                {energy.toFixed(1)}%
                            </span>
                        </div>
                        <span className="text-[10px] text-gray-500">Surplus: Réinjecté</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
