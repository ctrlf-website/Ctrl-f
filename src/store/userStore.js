import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: true, // 🔹 nuevo estado

  setUser: (userData) => set({ user: userData, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (value) => set({ isLoading: value }),
}));
