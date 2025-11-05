import { useForm } from "react-hook-form";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    reset(); // limpia el formulario
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Crea tu sitio web
        </h2>

        {/* Nombre del sitio */}
        <label className="block mb-2 font-medium">Nombre del sitio</label>
        <input
          type="text"
          placeholder="Ej: Mi Portfolio"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-blue-500"
          {...register("siteName", { required: "Este campo es obligatorio" })}
        />
        {errors.siteName && (
          <p className="text-red-500 text-sm mb-4">{errors.siteName.message}</p>
        )}

        {/* Estilos globales */}
        <label className="block mb-2 font-medium">Estilos globales</label>
        <select
          className="w-full border rounded-lg px-3 py-2 mb-6"
          {...register("globalStyle", { required: "Elegí un estilo" })}
        >
          <option value="">Seleccionar estilo...</option>
          <option value="minimalista">Minimalista</option>
          <option value="corporativo">Corporativo</option>
          <option value="moderno">Moderno</option>
          <option value="oscuro">Modo oscuro</option>
        </select>
        {errors.globalStyle && (
          <p className="text-red-500 text-sm mb-4">
            {errors.globalStyle.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
