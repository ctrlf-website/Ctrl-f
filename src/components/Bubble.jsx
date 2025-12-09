// Bubble.jsx — Burbuja reutilizable con animación visual

export default function Bubble({
  children,
  leftValue,
  rightValue,
  topValue,
  bottomValue,
  className = "",
  style = {},
  disabled,
}) {
  const horizontalPosition = { left: leftValue, right: rightValue };
  const verticalPosition = { top: topValue, bottom: bottomValue };

  return (
    <label
      className={`bubble cursor-pointer flex items-center justify-center ${className} ${
        disabled ? "disabled" : ""
      }`}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "100%",
        position: "absolute",
        ...verticalPosition,
        ...horizontalPosition,
        ...style,
      }}
    >
      {children}
    </label>
  );
}
