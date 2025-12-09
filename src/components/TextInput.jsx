// nuevo componente extraído desde HeaderContainer
import { EditNote } from "@mui/icons-material";
import Bubble from "./Bubble";

export default function TextInput({
  setEditingTitle,
  left,
  right,
  top,
  bottom,
}) {
  return (
    <Bubble
      leftValue={left}
      rightValue={right}
      topValue={top}
      bottomValue={bottom}
    >
      <EditNote
        onClick={() => setEditingTitle(true)}
        style={{ color: "black" }}
      />
    </Bubble>
  );
}
