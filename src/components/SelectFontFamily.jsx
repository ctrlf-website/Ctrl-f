// nuevo componente extraído desde HeaderContainer
import TitleIcon from "@mui/icons-material/Title";
import Bubble from "./Bubble";

export default function SelectFontFamily({
  path,
  value,
  register,
  update,
  showSelect,
  setShowSelect,
  side = "left",
  top,
  bottom,
}) {
  return (
    <Bubble side={side} topValue={top} bottomValue={bottom}>
      <TitleIcon
        fontSize="small"
        onClick={() => setShowSelect(true)}
        style={{ position: "relative" }}
      />

      {showSelect && (
        <select
          {...register(path)}
          value={value}
          onBlur={() => setShowSelect(false)}
          onChange={(e) => update(path, e.target.value)}
          className="text-sm"
          style={{ position: "absolute", left: "40px" }}
        >
          <option value="sans-serif" style={{ fontFamily: "sans-serif" }}>
            Sans Serif
          </option>
          <option value="serif" style={{ fontFamily: "serif" }}>
            Serif
          </option>
          <option value="monospace" style={{ fontFamily: "monospace" }}>
            Monospace
          </option>
          <option value="cursive" style={{ fontFamily: "cursive" }}>
            Cursive
          </option>
          <option value="fantasy" style={{ fontFamily: "fantasy" }}>
            Fantasy
          </option>
          {/* <option value="cursive" style={{fontFamily:""}}>Cursive</option>
          <option value="cursive" style={{fontFamily:"cursive"}}>Cursive</option>
          <option value="cursive" style={{fontFamily:"cursive"}}>Cursive</option> */}
        </select>
      )}
    </Bubble>
  );
}
