// CreateWebForm.jsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useSiteStore } from "../store/siteStore";
import { useBuildStore } from "../store/buildStore";
import { useNavigate } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue, // para actualizar form
    watch, // todo se observa desde el form
    formState: { errors },
  } = useForm();

  const { user } = useUserStore();
  const { saveSite, isLoading, error, fetchSite, miWeb } = useSiteStore();
  const { buildSite, deployedUrl, siteIsLoading } = useBuildStore();
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // cargar config inicial en el form
  // ---------------------------------------------------------
  useEffect(() => {
    if (user) fetchSite();
  }, [user, fetchSite]);

  useEffect(() => {
    if (!miWeb) return;

    const header = miWeb.header || {};

    reset({
      header: {
        title: header.title || "",
        backgroundColor: header.backgroundColor || "#ffffff",
        textColor: header.textColor || "#000000",
        textFamily: header.textFamily || "sans-serif",
        logoUrl: header.logoUrl || "", 
      },
    });

    // NO SETEO ESTADOS — solo form values
  }, [miWeb, reset, setValue]);

  // ---------------------------------------------------------
  // Preview de logo usando watch en vez de useState
  // ---------------------------------------------------------
  const watchedLogo = watch("header.logo"); // file
  const watchedHeader = watch("header"); //  para live preview

  const logoPreview = (() => {
    if (watchedLogo && watchedLogo.length > 0) {
      return URL.createObjectURL(watchedLogo[0]);
    }
    return watchedHeader?.logoUrl || ""; // viene de Firestore
  })();

  // ---------------------------------------------------------
  // Enviar formulario
  // ---------------------------------------------------------
  const onSubmit = async (data) => {
    if (!user) {
      alert("Primero tenés que iniciar sesión");
      navigate("/login", { state: { miWeb: data } });
      return;
    }

    const formData = new FormData();

    const miWebConfig = {
      header: {
        title: data.header.title,
        textColor: data.header.textColor,
        textFamily: data.header.textFamily,
        backgroundColor: data.header.backgroundColor,
        logoUrl: data.header.logoUrl || "", 
      },
    };

    formData.append("miWeb", JSON.stringify(miWebConfig));

    if (data.header.logo && data.header.logo[0]) {
      formData.append("logo", data.header.logo[0]);
    }

    await saveSite(formData);
    reset();
  };

  const onBuild = () => {
    if (!user) {
      alert("Primero tenés que iniciar sesión y PAGAR");
      return;
    }
    buildSite();
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-xl"
      >
        {/* 🟦 HEADER PREVIEW */}
        <HeaderContainer
          register={register}
          watch={watch} //se pasa WATCH
          setValue={setValue} //  se pasan setters del form
          logoPreview={logoPreview}
        />

        {/* BOTONES */}
        <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
          <div
            style={{ width: "80%", margin: "auto" }}
            className="flex gap-3 pt-2"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={onBuild}
              disabled={isLoading}
              className="flex-1 bg-white border border-blue-600 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
            >
              {siteIsLoading ? "Publicando..." : "Publicar sitio"}
            </button>
          </div>

          {deployedUrl && (
            <div className="mt-4 text-center">
              <a
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline hover:text-blue-800"
              >
                Ver tu sitio publicado 🚀
              </a>
            </div>
          )}

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              Error: {error.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
