import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useSiteStore } from "../store/siteStore";
import { useBuildStore } from "../store/buildStore";
import { useNavigate } from "react-router-dom";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [logoPreview, setLogoPreview] = useState(null);

  const { user } = useUserStore();
  const { saveSite, isLoading, error, fetchSite, miWeb } = useSiteStore();
  const { buildSite, deployedUrl, siteIsLoading } = useBuildStore();
  const navigate = useNavigate();

  // Cuando el usuario está logueado, traemos la configuración existente
  useEffect(() => {
    if (user) {
      fetchSite();
    }
  }, [user, fetchSite]);

  // Cuando cambian los datos del sitio en el store, precargamos el formulario
  useEffect(() => {
    if (!miWeb) return;

    console.log("[CreateWebForm] miWeb (raw):", miWeb);

    // Soportar varias formas de respuesta posibles desde el backend
    let header = null;

    if (miWeb.header) {
      header = miWeb.header;
    } else if (miWeb.miWeb) {
      // a veces el backend devuelve { miWeb: { header: ... } } o stringified
      try {
        const maybe =
          typeof miWeb.miWeb === "string"
            ? JSON.parse(miWeb.miWeb)
            : miWeb.miWeb;
        header = maybe.header || maybe;
      } catch (e) {
        console.warn("[CreateWebForm] no se pudo parsear miWeb.miWeb", e);
        header = null;
      }
    } else if (miWeb.data) {
      header = miWeb.data.header || miWeb.data;
    }

    if (header) {
      const { title, textColor, textFamily, backgroundColor } = header;
      console.log("[CreateWebForm] precargando formulario con:", {
        title,
        textColor,
        textFamily,
        backgroundColor,
      });
      // Reset todo el formulario y además forzar seteo por campo
      reset({ title, textColor, textFamily, backgroundColor });
      try {
        setValue("title", title || "");
        setValue("textColor", textColor || "#000000");
        setValue("textFamily", textFamily || "");
        setValue("backgroundColor", backgroundColor || "#ffffff");
        console.log("[CreateWebForm] setValue aplicado a campos individuales");
      } catch (e) {
        console.warn("[CreateWebForm] setValue falló:", e);
      }

      // Buscar posibles ubicaciones del logo en la respuesta
      const possibleLogo =
        header.logo ||
        header.logoUrl ||
        miWeb.logoUrl ||
        miWeb.logo ||
        miWeb.data?.logo ||
        null;
      if (possibleLogo) {
        setLogoPreview(possibleLogo);
      }
    }
  }, [miWeb, reset]);

  // Observar si el usuario selecciona un archivo nuevo y mostrar preview local
  const watchedLogo = watch("logo");
  useEffect(() => {
    if (watchedLogo && watchedLogo.length > 0) {
      const file = watchedLogo[0];
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedLogo]);

  // 2️⃣ Envío de datos formateado al formato que el backend necesita
  const onSubmit = async (data) => {
    console.log("[CREATE WEB FORM] user:", user);

    if (!user) {
      alert("Primero tenés que iniciar sesión");
      // Navegar a la página CreateWeb y pasar el nombre en location.state
      navigate("/login", { state: { miWeb: data } });
      return;
    }

    const formData = new FormData();

    // Convertimos el JSON del sitio en string
    const miWebConfig = {
      header: {
        title: data.title,
        textColor: data.textColor,
        textFamily: data.textFamily,
        backgroundColor: data.backgroundColor,
      },
    };

    // 📌 Agregamos config como JSON
    formData.append("miWeb", JSON.stringify(miWebConfig));

    // 📌 Agregamos archivo si existe
    if (data.logo && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }

    // 📌 Enviar al backend
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          Crea tu sitio web
        </h2>

        {/* 🔹 Título */}
        <div>
          <label className="block mb-1 font-medium">Título del hero</label>
          <input
            type="text"
            placeholder="Ej: Bienvenidos a mi sitio"
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            {...register("title", { required: "El título es obligatorio" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* 🔹 Color + Fuente en una sola fila */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Color del texto</label>
            <input
              type="color"
              className="w-full h-10 border rounded-lg cursor-pointer"
              {...register("textColor", { required: true })}
              defaultValue="#000000"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Fuente del texto</label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              {...register("textFamily", { required: "Elegí una fuente" })}
            >
              <option value="">Seleccionar fuente...</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
            </select>
            {errors.textFamily && (
              <p className="text-red-500 text-sm mt-1">
                {errors.textFamily.message}
              </p>
            )}
          </div>
        </div>

        {/* 🔹 Color de fondo */}
        <div>
          <label className="block mb-1 font-medium">Color de fondo</label>
          <input
            type="color"
            className="w-full h-10 border rounded-lg cursor-pointer"
            {...register("backgroundColor", { required: true })}
            defaultValue="#ffffff"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Logo</label>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <div
                role="img"
                aria-label="Logo preview"
                className="rounded border bg-white bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${logoPreview})`,
                  width: "96px",
                  height: "96px",
                }}
              />
            ) : ""}

            <div className="flex-1">
              <input type="file" accept="image/*" {...register("logo")} />
              <p className="text-xs text-gray-500 mt-1">
                Seleccioná una imagen para reemplazar el logo
              </p>
            </div>
          </div>
        </div>
        {/* 🔹 Botones en la misma línea */}
        <div className="flex gap-3 mt-2">
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
            {isLoading ? "Publicando..." : "Publicar sitio"}
          </button>
        </div>
        {/* 🔹 Link del sitio publicado */}
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
        {/* 🔹 Feedback visual */}
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
