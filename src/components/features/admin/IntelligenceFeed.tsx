import React, { useState } from 'react';
import { Bot, Check, X } from 'lucide-react';

const SUGGESTIONS = [
    {
        id: 1,
        text: "Gaëtan, l'Arena de Biyem-Assi est vide à 40% ce soir. Je suggère de lancer une promo Flash 'Happy Hour' (-20% sur la bière + terrain gratuit) pour les résidents à moins de 2km.",
        action: "Valider",
        time: "Il y a 2 min"
    },
    {
        id: 2,
        text: "Hausse d'activité inhabituelle détectée à Akwa (Bar 04). Stock de Guinness risque rupture dans 45min. J'ai pré-routé un van logistique.",
        action: "Confirmer Routage",
        time: "Il y a 12 min"
    }
];

export const IntelligenceFeed = () => {
    return (
        <div className="bg-black/40 border-l border-white/10 h-full p-4 flex flex-col w-full md:w-80">
            <div className="flex items-center gap-2 mb-6 text-blue-400">
                <Bot size={20} />
                <h2 className="font-bold tracking-wider text-sm">INTELLIGENCEfeed</h2>
            </div>

            <div className="space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                {SUGGESTIONS.map((item) => (
                    <div key={item.id} className="bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 p-4 rounded-xl relative group hover:border-blue-500/40 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Bot size={14} className="text-blue-300" />
                            </div>
                            <div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                    "{item.text}"
                                </p>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs py-1.5 px-2 rounded border border-blue-500/30 flex items-center justify-center gap-1 transition-colors">
                                        <Check size={12} /> {item.action}
                                    </button>
                                    <button className="bg-white/5 hover:bg-white/10 text-gray-400 text-xs py-1.5 px-2 rounded border border-white/10">
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <span className="absolute top-2 right-2 text-[10px] text-gray-600">{item.time}</span>
                    </div>
                ))}

                {/* Typing indicator */}
                <div className="flex gap-1 ml-12 opacity-50">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-0" />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200" />
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
                <input
                    type="text"
                    placeholder="Donner un ordre à l'IA..."
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none placeholder-gray-600"
                />
            </div>
        </div>
    );
};
