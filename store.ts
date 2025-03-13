import { create } from 'zustand';

interface VideoTypeState {
  videoType: string;
  setVideoType: (videoType: string) => void;
}

export const useVideoTypeStore = create<VideoTypeState>()((set) => ({
  videoType: 'all',
  setVideoType: (videoType) => set({ videoType }),
}));
