import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export default function WelcomeSection() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("Terrícola");
  const [animatingName, setAnimatingName] = useState("");
  const [showStory, setShowStory] = useState(false);
  const [deletingDone, setDeletingDone] = useState(false);

  const storyRef = useRef(null);
  const navigate = useNavigate();
  const deletingIntervalRef = useRef(null);

  // Efecto para animar el borrado de "Terrícola"
  useEffect(() => {
    if (!name || deletingDone) return;

    setDisplayName(""); // Ocultar el nombre original mientras se borra
    setAnimatingName(""); // Resetear animatingName

    // Fase 1: Borrar "Terrícola"
    const terrícola = "Terrícola";
    let charIndex = terrícola.length;
    deletingIntervalRef.current = setInterval(() => {
      if (charIndex > 0) {
        charIndex--;
        setAnimatingName(terrícola.slice(0, charIndex));
      } else {
        clearInterval(deletingIntervalRef.current);
        deletingIntervalRef.current = null;
        setAnimatingName(""); // Limpiar animatingName después del borrado
        setDeletingDone(true);
      }
    }, 100);

    return () => {
      if (deletingIntervalRef.current)
        clearInterval(deletingIntervalRef.current);
    };
  }, [name, deletingDone]);

  // Efecto para mostrar el nombre después del borrado
  useEffect(() => {
    if (deletingDone) {
      if (name) {
        setDisplayName(name);
      } else {
        setDisplayName(""); // Si se borra todo, limpiar displayName
      }
    }
  }, [deletingDone, name]);

  // Determinar qué mostrar en el saludo
  const getDisplayText = () => {
    if (animatingName) return animatingName; // Mostrar animación de borrado
    if (!deletingDone) return displayName; // Mostrar "Terrícola" si no se ha iniciado
    if (name) return name; // Mostrar el nombre ingresado
    return ""; // Mostrar cursor vacío si se borrró todo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setShowStory(true);

    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <section className="min-h-screen">
      {/* Saludo - siempre visible al inicio */}
      <div className="min-h-[40vh] w-[70%] mx-auto flex flex-col justify-center items-center text-center px-6 sticky top-0 bg-white z-10">
        <h1 className="text-4xl sm:text-5xl font-semibold animate-fade animate-typewriter">
          Hola{" "}
          <span className="font-bold" style={{ color: "var(--primary)" }}>
            {getDisplayText()}
            {deletingDone && !name && <span className="cursor-blink"></span>}
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
                    value.charAt(0).toUpperCase() +
                    value.slice(1).toLowerCase();

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
        <div>
          <p>Ya tenes tu web guardada?</p>
          <button
            onClick={() => navigate("/Login")}
            className="px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-md transition"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Iniciar sesion
          </button>
        </div>
      </div>

      {/* Historia - debajo del saludo */}
      {showStory && (
        <section
          ref={storyRef}
          className="relative z-0 max-w-xl  w-[70%] mx-auto text-lg animate-fade space-y-10 px-6 pb-20"
        >
          {/* 📌 PÁRRAFO 1 */}
          <div className="flex flex-col justify-center text-center items-center">
            <p>Viste lo rápido y facil que modificaste una página web?</p>
            <p>No tenes que saber para hacerlo, creeme..</p>
            <p>
              Pero como dicen, ver para creer, te invito a pasar a jugar y tocar
              todo lo que quieras.
            </p>
            <p>Es gratis y nada se va a romper.</p>
            <KeyboardDoubleArrowDownIcon
              style={{ fontSize: "3rem", color: "var(--primary)" }}
              className="animate-bounce mt-4"
            />
          </div>

          {/* 📌 BOTÓN FINAL */}
          <div className="min-h-[20vh] flex flex-col justify-center items-center">
            <button
              onClick={() => navigate("/crear-web", { state: { name } })}
              className="px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-md transition"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Crea tu pagina web
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
