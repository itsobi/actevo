'use client';

import { VideoCard } from './video-card';

interface VideosSectionProps {
  videos: {
    id: number;
    type: string;
    title: string;
    description: string;
    link: string;
    user: string;
  }[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
  return (
    <>
      {/* {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"/>
          
      )} */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={video} onLoad={() => {}} />
          ))
        ) : (
          <div className="text-center md:text-start text-muted-foreground">
            No videos found
          </div>
        )}
      </section>
    </>
  );
}
