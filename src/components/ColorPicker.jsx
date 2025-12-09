// nuevo componente extraído desde HeaderContainer
import { FormatColorText, FormatColorFill } from "@mui/icons-material";
import Bubble from "./Bubble";

export default function ColorPicker({
  path,
  value,
  register,
  update,
  icon,
  left,
  right,
  top,
  bottom,
  disabled,
}) {
  return (
    <Bubble
      leftValue={left}
      rightValue={right}
      topValue={top}
      bottomValue={bottom}
      disabled={disabled}
    >
      {icon === "text" ? (
        <FormatColorText fontSize="small" />
      ) : (
        <FormatColorFill fontSize="small" />
      )}

      <input
        type="color"
        {...register(path)}
        value={value}
        onChange={(e) => update(path, e.target.value)}
        className="w-7 h-7 border rounded-full cursor-pointer"
        style={{
          "-webkit-appearance": "none",
          "moz-appearance": "none",
          appearance: "none",
          width: "30px",
          height: "30px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        hidden
        disabled={disabled}
      />
    </Bubble>
  );
}
