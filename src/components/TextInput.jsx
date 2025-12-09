// nuevo componente extraído desde HeaderContainer
import { EditNote } from "@mui/icons-material";
import Bubble from "./Bubble";

export default function TextInput({
  side = "left",
  setEditingTitle,
  top,
  bottom,
}) {
  return (
    <Bubble side={side} topValue={top} bottomValue={bottom}>
      <EditNote
        onClick={() => setEditingTitle(true)}
        style={{ color: "black" }}
      />
    </Bubble>
  );
}
