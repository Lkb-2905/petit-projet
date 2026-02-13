import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Truck, Video } from 'lucide-react';

const LOCATIONS = [
    { id: 1, type: 'ARENA', x: '20%', y: '30%', name: 'Bonapriso Arena', status: 'normal', occupancy: '85%' },
    { id: 2, type: 'ARENA', x: '60%', y: '45%', name: 'Biyem-Assi Arena', status: 'low', occupancy: '40%' },
    { id: 3, type: 'LOGISTICS', x: '40%', y: '60%', name: 'Flotte Nord', status: 'moving', count: 12 },
    { id: 4, type: 'LOGISTICS', x: '75%', y: '25%', name: 'Flotte Est', status: 'moving', count: 8 },
    { id: 5, type: 'ALERT', x: '55%', y: '35%', name: 'Bar Akwa', status: 'critical', msg: 'Bagarre Détectée' },
];

export const CityMap = () => {
    const [selectedLoc, setSelectedLoc] = useState<number | null>(null);

    return (
        <div className="relative w-full h-[500px] bg-[#050510] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/10 group">
            {/* Map Background Simulation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black pointer-events-none" />

            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Locations */}
            {LOCATIONS.map((loc) => (
                <motion.div
                    key={loc.id}
                    className="absolute cursor-pointer"
                    style={{ left: loc.x, top: loc.y }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedLoc(loc.id)}
                >
                    {loc.type === 'ARENA' && (
                        <div className="relative group/pin">
                            <div className={`w-3 h-3 rounded-full ${loc.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse shadow-[0_0_15px_currentColor]`} />
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded">
                                {loc.name} ({loc.occupancy})
                            </div>
                        </div>
                    )}

                    {loc.type === 'LOGISTICS' && (
                        <div className="relative group/pin">
                            <div className="text-blue-400 p-1 bg-blue-500/10 rounded-full border border-blue-500/30">
                                <Truck size={12} />
                            </div>
                            {/* Moving animation */}
                            <motion.div
                                className="absolute -inset-2 border border-blue-500/20 rounded-full"
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </div>
                    )}

                    {loc.type === 'ALERT' && (
                        <div className="relative">
                            <div className="text-red-500 p-1 bg-red-500/20 rounded-full animate-bounce">
                                <AlertTriangle size={16} />
                            </div>
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 bg-red-900/90 text-white text-[10px] p-2 rounded border border-red-500 text-center z-10">
                                <span className="font-bold block text-red-300">INCIDENT EN COURS</span>
                                {loc.msg}
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}

            {/* Selected Location Overlay */}
            {selectedLoc && (
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-white/20 p-4 rounded-xl max-w-xs animate-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold">{LOCATIONS.find(l => l.id === selectedLoc)?.name}</h4>
                        <button onClick={(e) => { e.stopPropagation(); setSelectedLoc(null); }} className="text-gray-400 hover:text-white">
                            &times;
                        </button>
                    </div>
                    <div className="aspect-video bg-black rounded mb-2 flex items-center justify-center border border-white/10 relative overflow-hidden group/cam">
                        {/* Fake CCTV Feed */}
                        <div className="absolute inset-0 bg-green-900/10 flex items-center justify-center">
                            <span className="text-xs text-green-500 font-mono animate-pulse">LIVE FEED CONNECTION...</span>
                        </div>
                        <Video className="text-white/20" />
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[8px] text-white">REC</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
