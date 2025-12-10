// nuevo componente extraído desde HeaderContainer
import Bubble from "./Bubble";
import { AddPhotoAlternate } from "@mui/icons-material";

export default function ImagePicker({
  path,
  register,
  update,
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
      <AddPhotoAlternate />

      <input
        type="file"
        {...register(path)}
        accept="image/*"
        // onChange={(e) => update(path, e.target.value)}
        hidden
        disabled={disabled}
      />
    </Bubble>
  );
}
