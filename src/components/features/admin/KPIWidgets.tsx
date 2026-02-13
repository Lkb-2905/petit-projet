import React from 'react';
import { Activity, Camera, DollarSign, Heart, Play, Share2 } from 'lucide-react';

export const KPIWidgets = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Bio-Data Module */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-red-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <Activity className="text-red-500" size={18} loading="lazy" />
                            MODULE BIO-DATA
                        </h3>
                        <span className="text-xs text-gray-500">Santé Globale Citoyens</span>
                    </div>
                    <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded">LIVE</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-end justify-between">
                        <span className="text-sm text-gray-400">BPM Moyen (Arènes)</span>
                        <span className="text-2xl font-mono text-white">145 <span className="text-sm text-gray-600">BPM</span></span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600 w-[75%] animate-pulse" />
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/5">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Heart size={12} /> Calories Brûlées
                        </span>
                        <span className="text-xl font-mono text-white">2.5M <span className="text-sm text-gray-600">kcal</span></span>
                    </div>
                </div>
            </div>

            {/* Creator Module */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-purple-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <Camera className="text-purple-500" size={18} />
                            MODULE CREATOR
                        </h3>
                        <span className="text-xs text-gray-500">Usine à Buzz</span>
                    </div>
                    <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded">IA ACTIF</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-lg text-center">
                        <Play className="text-white/50 mx-auto mb-1" size={16} />
                        <span className="block text-2xl font-bold text-white">340</span>
                        <span className="text-[10px] text-gray-400">Vidéos Générées</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg text-center">
                        <Share2 className="text-white/50 mx-auto mb-1" size={16} />
                        <span className="block text-2xl font-bold text-white">1.2M</span>
                        <span className="text-[10px] text-gray-400">Vues TikTok</span>
                    </div>
                </div>
            </div>

            {/* Fintech Module */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-green-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <DollarSign className="text-green-500" size={18} />
                            MODULE FINTECH
                        </h3>
                        <span className="text-xs text-gray-500">Flux Financier (24h)</span>
                    </div>
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">+12.4%</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-end justify-between">
                        <span className="text-sm text-gray-400">Volume</span>
                        <span className="text-2xl font-mono text-white">45,000,000 <span className="text-sm text-gray-600">XAF</span></span>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/5">
                        <span className="text-sm text-gray-400">Micro-Crédits Auto</span>
                        <span className="text-xl font-mono text-green-400">150 <span className="text-xs text-gray-500">Approuvés</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
