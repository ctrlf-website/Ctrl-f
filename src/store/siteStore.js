import { create } from "zustand";
import { siteApi } from "../api/site";

export const useSiteStore = create((set) => ({
  miWeb: null,
  isLoading: false,
  error: null,

  fetchSite: async () => {
    set({ isLoading: true });
    try {
      const data = await siteApi.getSite();
      set({ miWeb: data, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  saveSite: async (data) => {
    set({ isLoading: true });
    try {
      const updated = await siteApi.updateSite(data);
      set({ miWeb: updated, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
