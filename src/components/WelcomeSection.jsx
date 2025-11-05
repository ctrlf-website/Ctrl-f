import { useState, useRef } from "react";

export default function WelcomeSection() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("Terrícola");
  const [showStory, setShowStory] = useState(false);
  const storyRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setDisplayName(name.trim());
    setShowStory(true);

    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-semibold animate-fade animate-typewriter">
        Bienvenide{" "}
        <span className="font-bold" style={{ color: "var(--primary)" }}>
          {displayName}
        </span>
      </h1>

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

              // Capitaliza solo la primera letra
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

      {/** ✨ Sección que aparece después */}
      {showStory && (
        <section
          ref={storyRef}
          className="mt-24 opacity-0 animate-fade text-lg"
        >
          <p>¿Viste qué rápido cambiaste una página web?</p>
          <p className="mt-2">Así de fácil es crear la tuya.</p>
          <p className="mt-2">
            Si querés seguir jugando, scrolleá hacia abajo.
          </p>

          <div className="text-4xl mt-6 animate-bounce-soft">↓</div>
        </section>
      )}
    </section>
  );
}
