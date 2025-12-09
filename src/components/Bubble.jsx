// Bubble.jsx
// Componente reutilizable para todos los inputs tipo "burbuja"

export default function Bubble({
  children,
  side = "left",
  topValue,
  bottomValue,
  className = "",
  style = {}, // 🔴 RED FLAG — permite override sin romper la burbuja
}) {
  // Posiciones dinámicas según lado
  const horizontalPosition =
    side === "left"
      ? { left: "10px", right: "auto" }
      : { right: "10px", left: "auto" };

  const verticalPosition = { top: topValue, bottom: bottomValue };

  return (
    <label
      className={`cursor-pointer flex items-center justify-center shadow ${className}`}
      style={{
        backgroundColor: "var(--bubble)",
        width: "30px",
        height: "30px",
        borderRadius: "100%",
        position: "absolute",

        ...verticalPosition,
        ...horizontalPosition, // 🔴 RED FLAG — posición dinámica
        ...style, // 🔴 RED FLAG — permite personalizar desde fuera
      }}
    >
      {children} {/* 🔴 RED FLAG — contiene cualquier input o icono */}
    </label>
  );
}
