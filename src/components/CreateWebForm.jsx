import { useForm } from "react-hook-form";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../store/userStore";

export default function CreateWebForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState("");
  const { user } = useUserStore();
  const onSubmit = async (data) => {
    setStatus("Guardando...");
    if (!user) {
      alert("Primero tenés que iniciar sesión");
      return;
    }

    try {
      // Referencia al documento del usuario
      const userRef = doc(db, "users", user.uid);

      // Guardar o actualizar los datos
      await setDoc(
        userRef,
        {
          email: user.email,
          miWeb: {
            siteName: data.siteName,
            globalStyle: data.globalStyle,
          },
        },
        { merge: true } // 🔹 Esto evita sobrescribir todo el documento
      );

      setStatus("✅ Guardado correctamente en Firestore!");
      reset();
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      setStatus("❌ Error al guardar. Revisa la consola.");
      reset();
    }
  };

  // const onSubmit = async (data) => {
  //   setStatus("Guardando...");
  //   try {
  //     // 🔹 Por ahora, usamos un ID de prueba
  //     const userId = "testUser";
  //     console.log(`Submit, ${userId}`, data);

  //     // 🔹 Guardamos en Firestore: users/testUser
  //     await setDoc(
  //       doc(db, "users", userId),
  //       {
  //         miWeb: {
  //           siteName: data.siteName,
  //           globalStyle: data.globalStyle,
  //         },
  //         updatedAt: serverTimestamp(),
  //       },
  //       { merge: true } // No borra otros campos si existen
  //     );

  //     setStatus("✅ Guardado correctamente en Firestore!");
  //     reset();
  //   } catch (error) {
  //     console.error("Error al guardar:", error);
  //     setStatus("❌ Error al guardar. Revisa la consola.");
  //   }
  // };

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

        {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </form>
    </div>
  );
}
