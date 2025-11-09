import { create } from "zustand";
import { publishApi } from "../api/publish";

export const usePublishStore = create((set) => ({
  published: null,
  isLoading: false,
  error: null,

  publishSite: async () => {
    set({ isLoading: true });
    try {
      await publishApi.publishSite();
      set({ published: true, isLoading: false });
    } catch (error) {
      set({ published: true, error, isLoading: false });
    }
  },
}));
