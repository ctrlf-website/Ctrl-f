// CreateWebForm.jsx
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useSiteStore } from "../store/siteStore";
import { useBuildStore } from "../store/buildStore";
import { useNavigate } from "react-router-dom";
import HeaderContainer from "./HeaderContainer";
import useImagePreview from "../hooks/useImagePreview";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useUserStore();
  const { saveSite, isLoading, error, fetchSite, miWeb } = useSiteStore();
  const { buildSite, deployedUrl, siteIsLoading } = useBuildStore();
  const [backgroundMode, setBackgroundMode] = useState("color");
  const navigate = useNavigate();

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
        backgroundImageUrl: header.backgroundImageUrl || "",
        logo: undefined,
        backgroundImage: undefined,
      },
    });
  }, [miWeb, reset, setValue]);

  const watchedLogo = watch("header.logo"); // FileList de RHF
  const watchedHeader = watch("header"); // valores de Firestore
  const watchedBackground = watch("header.backgroundImage");

  const logoPreview = useImagePreview(
    watchedLogo,
    watchedHeader?.logoUrl ||
      "https://res.cloudinary.com/dmieiirut/image/upload/v1764709159/ctrl-f-images/knsquqbd3oqa3utddip2.png"
  );

  const backgroundPreview = useImagePreview(
    watchedBackground,
    watchedHeader?.backgroundImageUrl || ""
  );

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
        backgroundMode: backgroundMode,
        backgroundColor: data.header.backgroundColor,
        logoUrl: data.header.logoUrl || "",
        backgroundImageUrl: data.header.backgroundImageUrl || "",
      },
    };

    formData.append("miWeb", JSON.stringify(miWebConfig));

    if (data.header.logo && data.header.logo[0]) {
      formData.append("headerLogo", data.header.logo[0]);
    }

    if (data.header.backgroundImage && data.header.backgroundImage[0]) {
      formData.append("headerBackground", data.header.backgroundImage[0]);
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
          backgroundPreview={backgroundPreview}
          backgroundMode={backgroundMode}
          setBackgroundMode={setBackgroundMode}
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
