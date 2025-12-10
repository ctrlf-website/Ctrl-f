import { useMemo } from "react";

/**
 * useImagePreview
 *
 * @param {FileList | undefined} fileList - lo que devuelve watch() de RHF
 * @param {string} fallbackUrl - URL existente si no hay archivo nuevo
 * @returns {string} - URL para mostrar en preview
 */
export default function useImagePreview(fileList, fallbackUrl = "") {
  return useMemo(() => {
    if (fileList instanceof FileList && fileList.length > 0) {
      return URL.createObjectURL(fileList[0]);
    }
    return fallbackUrl;
  }, [fileList, fallbackUrl]);
}
