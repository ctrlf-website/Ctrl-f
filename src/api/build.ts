import { getAuthHeader } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

export const buildApi = {
  async buildSite() {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_URL}/deploy`, {
      method: "POST",
      headers,
    });

    if (!res.ok) throw new Error("Error al publicar sitio");
    return res.json();
  },
};
