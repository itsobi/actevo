import { create } from 'zustand';

interface VideoTypeState {
  videoType: string;
  setVideoType: (videoType: string) => void;
}

const useVideoTypeStore = create<VideoTypeState>()((set) => ({
  videoType: 'all',
  setVideoType: (videoType) => set({ videoType }),
}));

export default useVideoTypeStore;
