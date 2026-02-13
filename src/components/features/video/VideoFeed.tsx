'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mediaService } from '@/lib/api/media';
import { VideoPlayer } from './VideoPlayer';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VideoFeed = () => {
    const [activeindex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: videos, isLoading } = useQuery({
        queryKey: ['videoFeed'],
        queryFn: mediaService.getFeed,
    });

    // Scroll Snap Observer
    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const index = Math.round(
                    containerRef.current.scrollTop / window.innerHeight
                );
                setActiveIndex(index);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    if (isLoading) return <div className="flex items-center justify-center h-screen bg-black text-white">Loading Empire Stream...</div>;

    // Placeholder data if API returns empty (for design verification) 
    const displayVideos = videos && videos.length > 0 ? videos : [
        {
            id: '1',
            file_url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
            title: 'Neon Nights in Douala',
            description: 'Vibing with the new energy #Empire2076',
            creator: { username: 'EmpireVibes' },
            likes_count: 1200,
            comments_count: 45
        },
        {
            id: '2',
            file_url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
            title: 'Nature reclaiming the city',
            description: 'Green future is here.',
            creator: { username: 'EcoWarrior' },
            likes_count: 850,
            comments_count: 20
        }
    ];

    return (
        <div
            ref={containerRef}
            className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {displayVideos.map((video: any, index: number) => (
                <div key={video.id} className="h-screen w-full snap-start relative">
                    <VideoPlayer
                        src={video?.files?.[0]?.file_url || video.file_url}
                        isActive={index === activeindex}
                    />

                    {/* Interaction Sidebar */}
                    <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20">
                        <div className="flex flex-col items-center gap-1">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.creator?.username}`} alt="avatar" className="w-full h-full rounded-full bg-black object-cover" />
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5">
                                    <Plus className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <button className="p-2 bg-transparent">
                                <Heart className="w-8 h-8 text-white drop-shadow-lg" />
                            </button>
                            <span className="text-white text-xs font-semibold drop-shadow-md">{video.likes_count}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <button className="p-2 bg-transparent">
                                <MessageCircle className="w-8 h-8 text-white drop-shadow-lg" />
                            </button>
                            <span className="text-white text-xs font-semibold drop-shadow-md">{video.comments_count || 0}</span>
                        </div>

                        <button className="p-2 bg-transparent">
                            <Share2 className="w-8 h-8 text-white drop-shadow-lg" />
                        </button>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-24 left-4 right-16 z-20 text-white">
                        <h3 className="font-bold text-lg mb-2">@{video.creator?.username || 'user'}</h3>
                        <p className="text-sm line-clamp-2">{video.description}</p>
                        <p className="text-sm font-semibold mt-2">🎵 {video.title} - Original Sound</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
