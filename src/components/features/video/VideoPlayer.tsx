'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    isActive: boolean;
    onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, isActive, onEnded }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(() => {
                // Autoplay blocked handling
                setIsPlaying(false);
            });
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="relative w-full h-full bg-black">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={togglePlay}
                onEnded={onEnded}
            />

            {/* Play/Pause Overlay Animation could go here */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <Play className="w-16 h-16 text-white/80 fill-white" />
                </div>
            )}

            {/* Mute Control */}
            <button
                onClick={toggleMute}
                className="absolute top-20 right-4 p-2 bg-black/40 rounded-full backdrop-blur-md z-10"
            >
                {isMuted ? <VolumeX className="text-white w-6 h-6" /> : <Volume2 className="text-white w-6 h-6" />}
            </button>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
    );
};
