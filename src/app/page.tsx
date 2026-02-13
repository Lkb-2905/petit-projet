import { VideoFeed } from '@/components/features/video/VideoFeed';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <VideoFeed />
    </div>
  );
}
