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

  saveSite: async (formData) => {
    set({ isLoading: true });
    try {
      const updated = await siteApi.updateSite(formData);
      set({ miWeb: updated, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
