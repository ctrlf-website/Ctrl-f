// nuevo componente extraído desde HeaderContainer
import Bubble from "./Bubble";
import { AddPhotoAlternate } from "@mui/icons-material";

export default function ImagePicker({
  path,
  register,
  update,
  side = "left",
  bottom,
}) {
  return (
    <Bubble side={side} bottomValue={bottom}>
      <AddPhotoAlternate />
      <input
        type="file"
        {...register(path)}
        accept="image/*"
        onChange={(e) => update(path, e.target.value)}
        hidden
      />
    </Bubble>
  );
}
