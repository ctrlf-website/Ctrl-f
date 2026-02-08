import { useState } from "react";
import {
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import ColorPicker from "./ColorPicker";
import SelectFontFamily from "./SelectFontFamily";
import CardItem from "./CardItem";

export default function CardsContainer({ register, watch, setValue }) {
  // 🔹 Fuente de verdad: formulario
  const cards = watch("cards") || {};
  const items = cards.items || [];
  const count = cards.count || 3;
  const watchedImages = watch("cards.items") || [];

  // 🔹 UI state
  const [editingTitle, setEditingTitle] = useState(null);
  const [editingText, setEditingText] = useState(null);
  const [showSelect, setShowSelect] = useState(false);

  // 🔹 helper igual que HeaderContainer
  const update = (path, value) => {
    console.log("update", path, value);
    console.log("miWeb.cards", cards);

    setValue(path, value, { shouldDirty: true, shouldTouch: true });
  };

  // 🔹 switch 3 / 6 (ajusta count + items)
  const handleCountChange = () => {
    const nextCount = count === 6 ? 3 : 6;
    const nextItems = [...items];

    if (nextCount > items.length) {
      for (let i = items.length; i < nextCount; i++) {
        nextItems.push({ title: "", description: "", imageUrl: "" });
      }
    }

    update("cards.count", nextCount);
    update("cards.items", nextItems.slice(0, nextCount));
  };

  // const imagePreviews = items.map((item, idx) =>
  //   useImagePreview(watchedImages?.[idx]?.imageFile, item.imageUrl || ""),
  // );

  return (
    <>
      {/* 🔧 CONTROLES GLOBALES */}
      <section className="border-2 border-black w-[70%] m-auto my-[20px] flex items-center justify-around">
        <span>
          <span>3</span>
          <Switch checked={count === 6} onChange={handleCountChange} />
          <span>6</span>
        </span>

        <span className="relative min-w-[200px] min-h-[40px]">
          <ColorPicker
            path="cards.backgroundColor"
            value={cards.backgroundColor}
            register={register}
            update={update}
            icon="background"
            right="120px"
            top="5px"
          />

          <SelectFontFamily
            path="cards.textFamily"
            value={cards.textFamily}
            register={register}
            update={update}
            showSelect={showSelect}
            setShowSelect={setShowSelect}
            right="80px"
            top="5px"
          />

          <ColorPicker
            path="cards.textColor"
            value={cards.textColor}
            register={register}
            update={update}
            icon="text"
            right="40px"
            top="5px"
          />
        </span>

        <RadioGroup
          value={cards.textAlign || "start"}
          onChange={(e) => update("cards.textAlign", e.target.value)}
          className="w-[30%] flex !flex-row justify-around"
        >
          <FormControlLabel
            value="start"
            control={<Radio />}
            label={<FormatAlignLeftIcon />}
          />
          <FormControlLabel
            value="center"
            control={<Radio />}
            label={<FormatAlignJustifyIcon />}
          />
          <FormControlLabel
            value="end"
            control={<Radio />}
            label={<FormatAlignRightIcon />}
          />
        </RadioGroup>
      </section>

      {/* 🧩 CARDS */}
      <section className="grid grid-cols-3 justify-items-center w-full gap-y-[20px]">
        {items.slice(0, count).map((item, idx) => (
          <CardItem
            key={idx}
            item={item}
            idx={idx}
            cards={cards}
            register={register}
            update={update}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            editingText={editingText}
            setEditingText={setEditingText}
          />
        ))}
      </section>
    </>
  );
}
