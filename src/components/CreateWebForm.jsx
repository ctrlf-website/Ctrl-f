// import { useForm } from "react-hook-form";
// import { useUserStore } from "../store/userStore";

// export default function CreateWebForm() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const { user } = useUserStore();
//   const { saveSite } = useSiteStore();

//   const onSubmit = (data) => {
//     if (!user) {
//       alert("Primero tenés que iniciar sesión");
//       return;
//     }
//     saveSite(data);
//     reset();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Crea tu sitio web
//         </h2>

//         {/* Nombre del sitio */}
//         <label className="block mb-2 font-medium">Nombre del sitio</label>
//         <input
//           type="text"
//           placeholder="Ej: Mi Portfolio"
//           className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-blue-500"
//           {...register("siteName", { required: "Este campo es obligatorio" })}
//         />
//         {errors.siteName && (
//           <p className="text-red-500 text-sm mb-4">{errors.siteName.message}</p>
//         )}

//         {/* Estilos globales */}
//         <label className="block mb-2 font-medium">Estilos globales</label>
//         <select
//           className="w-full border rounded-lg px-3 py-2 mb-6"
//           {...register("globalStyle", { required: "Elegí un estilo" })}
//         >
//           <option value="">Seleccionar estilo...</option>
//           <option value="minimalista">Minimalista</option>
//           <option value="corporativo">Corporativo</option>
//           <option value="moderno">Moderno</option>
//           <option value="oscuro">Modo oscuro</option>
//         </select>
//         {errors.globalStyle && (
//           <p className="text-red-500 text-sm mb-4">
//             {errors.globalStyle.message}
//           </p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Crear
//         </button>

//         {status && <p className="mt-4 text-center text-sm">{status}</p>}
//       </form>
//     </div>
//   );
// }
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { useSiteStore } from "../store/siteStore";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useUserStore();
  const { saveSite, isLoading, error } = useSiteStore();

  // 2️⃣ Envío de datos formateado al formato que el backend necesita
  const onSubmit = (data) => {
    if (!user) {
      alert("Primero tenés que iniciar sesión");
      return;
    }

    const payload = {
      miWeb: {
        hero: {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Crea tu sitio web
        </h2>

        {/* 🔹 Título */}
        <label className="block mb-2 font-medium">Título del hero</label>
        <input
          type="text"
          placeholder="Ej: Bienvenidos a mi sitio"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-blue-500"
          {...register("title", { required: "El título es obligatorio" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-4">{errors.title.message}</p>
        )}

        {/* 🔹 Color de texto */}
        <label className="block mb-2 font-medium">Color del texto</label>
        <input
          type="color"
          className="w-full h-10 border rounded-lg mb-4 cursor-pointer"
          {...register("textColor", { required: true })}
          defaultValue="#000000"
        />

        {/* 🔹 Fuente del texto */}
        <label className="block mb-2 font-medium">Fuente del texto</label>
        <select
          className="w-full border rounded-lg px-3 py-2 mb-4"
          {...register("textFamily", { required: "Elegí una fuente" })}
        >
          <option value="">Seleccionar fuente...</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
        </select>
        {errors.textFamily && (
          <p className="text-red-500 text-sm mb-4">
            {errors.textFamily.message}
          </p>
        )}

        {/* 🔹 Color de fondo */}
        <label className="block mb-2 font-medium">Color de fondo</label>
        <input
          type="color"
          className="w-full h-10 border rounded-lg mb-6 cursor-pointer"
          {...register("backgroundColor", { required: true })}
          defaultValue="#ffffff"
        />

        {/* 🔹 Botón submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </button>

        {/* 🔹 Feedback visual */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
