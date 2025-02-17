declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}
// ... rest of your existing code ...

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { typeMap } from '@/lib/data/allVideos';
import { useEffect } from 'react';

interface VideoCardProps {
  video: {
    id: number;
    type: string;
    title: string;
    description: string;
    link: string;
    user: string;
  };
  onLoad: () => void;
}

export function VideoCard({ video, onLoad }: VideoCardProps) {
  return (
    <Card className="border-b-2 border-gray-300">
      <CardContent className="aspect-video relative p-0">
        <iframe
          className="absolute inset-0 w-full h-full rounded-t"
          src={video.link}
          onLoad={onLoad}
          title="YouTube video player"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </CardContent>
      <CardHeader>
        <CardTitle className="mb-2">{video.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <p>{video.user}</p>
            </div>
            <p className="text-xs">
              {typeMap[video.type as keyof typeof typeMap]}
            </p>
          </div>
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <p className="text-sm">{video.description}</p>
      </CardFooter>
    </Card>
  );
}
