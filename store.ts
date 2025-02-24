import { create } from 'zustand';

interface VideoTypeState {
  videoType: string;
  setVideoType: (videoType: string) => void;
}

export const useVideoTypeStore = create<VideoTypeState>()((set) => ({
  videoType: 'all',
  setVideoType: (videoType) => set({ videoType }),
}));

interface AIDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useAIDialogStore = create<AIDialogState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
