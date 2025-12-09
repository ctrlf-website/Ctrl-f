import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeSection() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("Terrícola");
  const [showStory, setShowStory] = useState(false);

  const storyRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const trimmed = name.trim();
    setDisplayName(trimmed);
    setShowStory(true);

    // YA NO navega automáticamente
    // Solo mostramos la historia
    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-semibold animate-fade animate-typewriter">
        Bienvenide{" "}
        <span className="font-bold" style={{ color: "var(--primary)" }}>
          {displayName}
        </span>
      </h1>

      {!showStory && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mt-10 animate-fade"
        >
          <label className="block text-lg mb-3">
            Si querés que te salude por tu nombre, decime cómo te llaman:
          </label>

          <div className="flex gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Escribí tu nombre"
              onChange={(e) => {
                const value = e.target.value;

                const formatted =
                  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

                setName(formatted);
              }}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "var(--primary)" }}
            />

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: "var(--primary)" }}
            >
              OK
            </button>
          </div>
        </form>
      )}

      {showStory && (
        <section
          ref={storyRef}
          className="mt-24 max-w-xl text-lg animate-fade space-y-10"
        >
          {/* 📌 PÁRRAFO 1 */}
          <div className="min-h-[80vh] flex flex-col justify-center">
            <p>¿Viste qué rápido cambiaste una página web?</p>
            <p className="mt-2">Eso fue solo el comienzo.</p>
          </div>

          {/* 📌 PÁRRAFO 2 */}
          <div className="min-h-[80vh] flex flex-col justify-center">
            <p>Ahora estás en una pequeña historia interactiva.</p>
            <p className="mt-2">
              Mientras scrolleás, vas desbloqueando pasos para crear tu sitio.
            </p>
          </div>

          {/* 📌 PÁRRAFO 3 — Podés agregar todos los que quieras */}
          <div className="min-h-[80vh] flex flex-col justify-center">
            <p>Cada parte te muestra lo fácil que es personalizarlo.</p>
            <p className="mt-2">
              Colores, tipografías, imágenes... todo en tus manos.
            </p>
          </div>

          {/* 📌 BOTÓN FINAL */}
          <div className="min-h-[60vh] flex flex-col justify-center items-center">
            <button
              onClick={() => navigate("/crear-web", { state: { name } })}
              className="px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-md transition"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Ir a crear mi web 🚀
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
