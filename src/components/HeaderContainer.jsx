// HeaderContainer.jsx
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import TextInput from "./TextInput";
import SelectFontFamily from "./SelectFontFamily";
import { Switch } from "@mui/material";

export default function HeaderContainer({
  register,
  watch, //reemplaza todos los useState
  setValue, //  permite actualizar valores del form
  logoPreview, // viene preparado desde el padre

}) {
  const header = watch("header") || {};

  const [editingTitle, setEditingTitle] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [checked, setChecked] = useState(false);
  const [disabledImage, setDisabledImage] = useState(true);
  const [disabledColor, setDisabledColor] = useState(false);

  //  Helper para actualizar con dot notation
  const update = (path, value) => {
    setValue(path, value, { shouldDirty: true, shouldTouch: true });
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      console.log("ES TRUE, cargo imagen y dejo el color");
      setDisabledColor(true);
      setDisabledImage(false);

      update("header.backgroundImage", "");
    } else {
      console.log("ES FALSE, borro imagen y cargo el color");
      setDisabledImage(true);
      setDisabledColor(false);

      update("header.backgroundImage", "");
    }
  };

  return (
    <>
      <div className="relative overflow-hidden shadow-lg">
        <div
          className="flex items-center justify-start text-center"
          style={{
            backgroundColor: header.backgroundColor || "yellow",
            position: "relative",
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
            disabled={disabledColor}
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
            disabled={disabledImage}
          />

          <div
            className="mr-6"
            style={{
              position: "relative",
              margin: "24px",
            }}
          >
            <div className="relative">
              <div
                className="shadow-md bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: logoPreview
                    ? `url(${logoPreview})`
                    : "url(https://res.cloudinary.com/dmieiirut/image/upload/v1764709159/ctrl-f-images/knsquqbd3oqa3utddip2.png)",
                  width: "120px",
                  height: "120px",
                  borderRadius: "100%",
                }}
              />

              <ImagePicker
                path="header.logo"
                register={register}
                update={update}
                right={"10px"}
                bottom={"0"}
              />
            </div>
          </div>
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
                  backgroundColor: "red",
                  border: "none",
                  appearance: "none",
                  borderBottom: "1px solid black",
                  fontSize: "xxx-large",
                  display: "block",
                }}
              />
            ) : (
              <div className="flex items-center justify-center">
                <h1
                  className="mt-4 text-2xl font-semibold hover:opacity-80 transition"
                  style={{
                    fontFamily: header.textFamily,
                    color: header.textColor,
                    position: "relative",
                  }}
                >
                  {header.title || "Haz click para cambiar el título del sitio"}
                  <TextInput
                    setEditingTitle={setEditingTitle}
                    right="-50px"
                    top="4px"
                  />
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
