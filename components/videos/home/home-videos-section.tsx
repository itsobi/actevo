'use client';

import useVideoTypeStore from '@/store';
import { VideoCard } from '../video-card';
import { allVideos } from '@/lib/data/allVideos';
import { upperBodyVideos } from '@/lib/data/upperBody';
import { lowerBodyVideos } from '@/lib/data/lowerBody';
import { useState, useEffect } from 'react';

export function HomeVideosSection() {
  const { videoType } = useVideoTypeStore();
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  const videos =
    videoType === 'all'
      ? allVideos
      : videoType === 'upper_body'
      ? upperBodyVideos
      : videoType === 'lower_body'
      ? lowerBodyVideos
      : [];

  const handleVideoLoad = (videoId: string) => {
    setLoadedVideos((prev) => new Set([...prev, videoId]));
  };

  const isLoading = loadedVideos.size < videos.length;

  // Reset loaded videos when video type changes
  useEffect(() => {
    setLoadedVideos(new Set());
  }, [videoType]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" />
      )}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onLoad={() => handleVideoLoad(video.id.toString())}
            />
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
