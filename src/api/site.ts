import { MiWeb } from "../types/miWeb";
import { getAuthHeader } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

export const siteApi = {
  async getSite() {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_URL}/site`, { headers });
    if (!res.ok) throw new Error("Error al obtener datos");
    return res.json();
  },

  async updateSite(formData: FormData) {
    const headers = await getAuthHeader();

    console.log(`[API site] api URL: ${API_URL}-> headers`, headers);

    const res = await fetch(`${API_URL}/site`, {
      method: "PATCH",
      headers,
      body: formData,
    });

    if (!res.ok) throw new Error("Error al guardar cambios");
    return res.json();
  },
};
