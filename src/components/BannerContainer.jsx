// BannerContainer.jsx
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import TextInput from "./TextInput";
import SelectFontFamily from "./SelectFontFamily";
import { Switch } from "@mui/material";

export default function BannerContainer({
  register,
  watch, //reemplaza todos los useState
  setValue, //  permite actualizar valores del form
  logoPreview, // viene preparado desde el padre
  backgroundPreview,
  backgroundMode,
  setBackgroundMode,
}) {
  const header = watch("header") || {};

  const [editingTitle, setEditingTitle] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [checked, setChecked] = useState(false);

  //  Helper para actualizar con dot notation
  const update = (path, value) => {
    setValue(path, value, { shouldDirty: true, shouldTouch: true });
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    setBackgroundMode((prev) => (prev === "color" ? "image" : "color"));
    console.log(
      "[HEADER] que tengo guardado en backgroundPREVIEW",
      backgroundPreview,
    );
  };

  return (
    <>
      <div className="relative overflow-hidden shadow-lg">
        <div
          className="borde-dibujado flex items-center justify-start text-center"
          style={{
            position: "relative",
            backgroundColor:
              backgroundMode === "color" ? header.backgroundColor : "#FFFFFF",

            backgroundImage:
              backgroundMode === "image" && backgroundPreview
                ? `url(${backgroundPreview})`
                : "none",

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/*  color picker reemplazado por componente */}
          <ColorPicker
            path="header.backgroundColor"
            value={header.backgroundColor}
            register={register}
            update={update}
            icon={"background"}
            right="120px"
            top="10px"
            disabled={backgroundMode === "image"}
          />
          <div style={{ position: "absolute", right: "70px", top: "5px" }}>
            <Switch
              checked={checked}
              onChange={handleChange}
              slotProps={{ input: { "aria-label": "controlled" } }}
            />
          </div>

          <ImagePicker
            path="header.backgroundImage"
            register={register}
            update={update}
            right="50px"
            top="10px"
            disabled={backgroundMode === "color"}
          />

          <div
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <SelectFontFamily
              path="header.textFamily"
              value={header.textFamily}
              register={register}
              update={update}
              showSelect={showSelect}
              setShowSelect={setShowSelect}
              left="140px"
              right=""
              top="-25px"
              bottom=""
            />

            <ColorPicker
              path="header.textColor"
              value={header.textColor}
              register={register}
              update={update}
              icon={"text"}
              left="100px"
              right=""
              top="-25px"
              bottom=""
            />

            {editingTitle ? (
              <input
                autoFocus
                type="text"
                {...register("header.title")}
                value={header.title}
                onChange={(e) => update("header.title", e.target.value)}
                onBlur={() => setEditingTitle(false)}
                className="w-full shadow-sm focus:outline-none focus:ring-0 focus:border-none"
                placeholder="Escribe el título del sitio"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  appearance: "none",
                  borderBottom: "1px solid black",
                  fontSize: "xxx-large",
                  display: "block",
                }}
              />
            ) : (
              <div className="flex items-center justify-center">
                <h3
                  className="mt-4 text-2xl font-semibold hover:opacity-80 transition"
                  style={{
                    fontFamily: header.textFamily,
                    color: header.textColor,
                    position: "relative",
                  }}
                >
                  {"Aqui va un llamado a la accion"}
                  <TextInput
                    setEditingTitle={setEditingTitle}
                    right="-50px"
                    top="4px"
                  />
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
