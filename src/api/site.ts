import { MiWeb } from "../types/miWeb";
import { getAuthHeader } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

export const siteApi = {
  async getSite() {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_URL}/api/site`, { headers });
    if (!res.ok) throw new Error("Error al obtener datos");
    return res.json();
  },

  async updateSite(data: MiWeb) {
    const headers = {
      ...(await getAuthHeader()),
      "Content-Type": "application/json",
    };
    console.log(`[API site] api URL: ${API_URL}-> headers`, headers);

    const res = await fetch(`${API_URL}/site`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al guardar cambios");
    return res.json();
  },
};
