// buildStore.js
import { create } from "zustand";
import { buildApi } from "../api/build";

export const useBuildStore = create((set) => ({
  deployedUrl: null,
  siteIsLoading: false,
  error: null,

  buildSite: async () => {
    set({ siteIsLoading: true, error: null });

    try {
      const response = await buildApi.buildSite();

      // Esperamos que el backend devuelva { status, message, url }
      set({
        deployedUrl: response?.url || null,
        siteIsLoading: false,
      });
    } catch (error) {
      set({
        error,
        siteIsLoading: false,
      });
    }
  },
}));
