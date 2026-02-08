import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import ImagePicker from "./ImagePicker";
import useImagePreview from "../hooks/useImagePreview";

export default function CardItem({
  item,
  idx,
  cards,
  register,
  update,
  editingTitle,
  setEditingTitle,
  editingText,
  setEditingText,
}) {
  const preview = useImagePreview(item.imageFile, item.imageUrl || "");

  return (
    <Card
      className="border-2 border-black p-[10px] flex flex-col w-[300px]"
      style={{ backgroundColor: cards.backgroundColor }}
    >
      <CardMedia
        className="h-[140px] relative borde-dibujado"
        image={
          preview ||
          "https://res.cloudinary.com/dmieiirut/image/upload/v1764709159/ctrl-f-images/knsquqbd3oqa3utddip2.png"
        }
      >
        <ImagePicker
          path={`cards.items.${idx}.imageFile`}
          register={register}
          update={update}
          right="10px"
          bottom="10px"
        />
      </CardMedia>

      <CardContent>
        {/* TÍTULO */}
        {editingTitle === idx ? (
          <input
            autoFocus
            {...register(`cards.items.${idx}.title`)}
            value={item.title}
            onChange={(e) => update(`cards.items.${idx}.title`, e.target.value)}
            onBlur={() => setEditingTitle(null)}
            className="w-full border-b-2 border-black text-2xl focus:outline-none"
          />
        ) : (
          <h2
            className="mt-4 text-2xl font-semibold cursor-pointer"
            style={{
              fontFamily: cards.textFamily,
              color: cards.textColor,
              textAlign: cards.textAlign,
            }}
            onClick={() => setEditingTitle(idx)}
          >
            {item.title || "Haz click para editar el título"}
          </h2>
        )}

        {/* DESCRIPCIÓN */}
        {editingText === idx ? (
          <textarea
            {...register(`cards.items.${idx}.description`)}
            value={item.description}
            onChange={(e) =>
              update(`cards.items.${idx}.description`, e.target.value)
            }
            onBlur={() => setEditingText(null)}
            className="w-full resize-none bg-transparent focus:outline-none mt-2"
          />
        ) : (
          <p
            className="mt-4 cursor-pointer"
            style={{
              fontFamily: cards.textFamily,
              color: cards.textColor,
              textAlign: cards.textAlign,
            }}
            onClick={() => setEditingText(idx)}
          >
            {item.description || "Haz click para editar la descripción"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
