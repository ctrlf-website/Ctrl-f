// HeaderContainer.jsx
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import ImagePicker from "./ImagePicker";
import TextInput from "./TextInput";
import SelectFontFamily from "./SelectFontFamily";

export default function HeaderContainer({
  register,
  watch, //reemplaza todos los useState
  setValue, //  permite actualizar valores del form
  logoPreview, // viene preparado desde el padre
}) {
  const header = watch("header") || {};

  const [editingTitle, setEditingTitle] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  //  Helper para actualizar con dot notation
  const update = (path, value) => {
    setValue(path, value, { shouldDirty: true, shouldTouch: true });
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
            side="left"
            top="10px"
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
                side="right"
                bottom={"0"}
              />
            </div>
          </div>
          <div
            style={{
              position: "relative",
              border: "3px green solid",
              width: "100%",
              // height: "100px",
            }}
          >
            <SelectFontFamily
              path="header.textFamily"
              value={header.textFamily}
              register={register}
              update={update}
              showSelect={showSelect}
              setShowSelect={setShowSelect}
              side="left"
              top="-40px"
              bottom=""
            />

            <ColorPicker
              path="header.textColor"
              value={header.textColor}
              register={register}
              update={update}
              icon={"text"}
              side="right"
              top="-40px"
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
                </h1>
                <TextInput
                  setEditingTitle={setEditingTitle}
                  side="right"
                  top="4px"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
