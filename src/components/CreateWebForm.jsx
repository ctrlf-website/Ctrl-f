import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { useSiteStore } from "../store/siteStore";
import { useBuildStore } from "../store/buildStore";
import { useNavigate } from "react-router-dom";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useUserStore();
  const { saveSite, isLoading, error } = useSiteStore();
  const { buildSite } = useBuildStore();
  const navigate = useNavigate();

  // 2️⃣ Envío de datos formateado al formato que el backend necesita
  const onSubmit = (data) => {
    console.log("[CREATE WEB FORM] user:", user);

    if (!user) {
      alert("Primero tenés que iniciar sesión");
      // Navegar a la página CreateWeb y pasar el nombre en location.state
      navigate("/login", { state: { miWeb: data } });
      return;
    }

    const payload = {
      miWeb: {
        header: {
          title: data.title,
          textColor: data.textColor,
          textFamily: data.textFamily,
          backgroundColor: data.backgroundColor,
        },
      },
    };

    saveSite(payload);
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
