import { create } from "zustand";
import { buildApi } from "../api/build";

export const useBuildStore = create((set) => ({
  builded: null,
  isLoading: false,
  error: null,

  buildSite: async () => {
    set({ isLoading: true });
    try {
      await buildApi.buildSite();
      set({ builded: true, isLoading: false });
    } catch (error) {
      set({ builded: true, error, isLoading: false });
    }
  },
}));
