import React from 'react';
import { motion } from 'framer-motion';

interface TierProgressProps {
    currentTier: string;
    currentScore: number;
    nextTier: string | null;
    pointsNeeded: number;
    progressPercent: number;
}

const TIER_COLORS: Record<string, string> = {
    iron: 'bg-gray-400',
    gold: 'bg-yellow-500',
    vibranium: 'bg-purple-600',
};

const TIER_LABELS: Record<string, string> = {
    iron: 'Citoyen Fer',
    gold: 'Citoyen Or',
    vibranium: 'Citoyen Vibranium',
};

export const TierProgress: React.FC<TierProgressProps> = ({
    currentTier,
    currentScore,
    nextTier,
    pointsNeeded,
    progressPercent,
}) => {
    const tierColor = TIER_COLORS[currentTier] || 'bg-gray-400';

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                        {TIER_LABELS[currentTier]}
                    </h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Niveau Actuel
                    </p>
                </div>
                <div className={`w-10 h-10 rounded-full ${tierColor} shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center font-bold text-black`}>
                    {currentTier[0].toUpperCase()}
                </div>
            </div>

            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                    className={`absolute top-0 left-0 h-full ${tierColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>

            {nextTier ? (
                <div className="flex justify-between text-xs text-gray-400">
                    <span>{currentScore.toLocaleString()} pts</span>
                    <span>
                        {pointsNeeded.toLocaleString()} pts pour {TIER_LABELS[nextTier]}
                    </span>
                </div>
            ) : (
                <div className="text-center text-xs text-purple-400 font-medium">
                    Niveau Maximum Atteint ! 👑
                </div>
            )}
        </div>
    );
};
