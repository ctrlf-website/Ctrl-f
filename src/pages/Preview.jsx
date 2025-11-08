import { useLocation, useNavigate } from "react-router-dom";

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    // Si el usuario entra directo sin pasar por el formulario
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center p-6">
        <p className="text-xl mb-4">No hay datos de sitio disponibles 😅</p>
        <button
          onClick={() => navigate("/crear-web")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear un sitio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-6">
        Tu sitio <span className="text-blue-600">"{data.siteName}"</span> está en
        construcción 🛠️
      </h1>

      <p className="text-lg mb-2">
        Estilo seleccionado: <strong>{data.globalStyle}</strong>
      </p>

      <p className="text-gray-600 mb-6">
        Pronto vas a poder personalizar colores, tipografía y secciones.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Volver al inicio
      </button>
    </div>
  );
}
