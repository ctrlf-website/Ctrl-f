import { useState } from "react";
import {
  FormatColorText,
  FormatColorFill,
  TextFormat,
  AddPhotoAlternate,
  EditNote,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function CardsContainer({
  register,
  editingTitle,
  setEditingTitle,
  titleFont,
  titleColor,
  titleText,
}) {
  const [showSelect, setShowSelect] = useState(false);
  const cards = 3 || 6;
  return (
    <>
      {/* {cards.map((card, index) => (
    
      ))} */}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140, position: "relative" }}
          image="https://res.cloudinary.com/dmieiirut/image/upload/v1764709159/ctrl-f-images/knsquqbd3oqa3utddip2.png"
          title="green iguana"
        >
          <label
            className="absolute bottom-0 right-0 cursor-pointer"
            style={{
              backgroundColor: "var(--primary)",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
              position: "absolute",
              bottom: "0",
              right: "10px",
            }}
          >
            <AddPhotoAlternate />

            <input hidden type="file" accept="image/*" {...register("logo")} />
          </label>
        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {editingTitle ? (
              <input
                autoFocus
                type="text"
                {...register("title")}
                className="w-full shadow-sm focus:outline-none focus:ring-0 focus:border-none"
                placeholder="Escribe el título del sitio"
                onBlur={() => setEditingTitle(false)}
                style={{
                  backgroundColor: "red",
                  border: "none",
                  appearance: "none",
                  borderBottom: "1px solid black",
                  fontSize: "xxx-large",
                }}
              />
            ) : (
              <div className="flex items-center justify-center">
                <h1
                  className="mt-4 text-2xl font-semibold hover:opacity-80 transition"
                  style={{
                    fontFamily: titleFont,
                    color: titleColor,
                    position: "relative",
                  }}
                >
                  {titleText || "Haz click para cambiar el título del sitio"}
                  <EditNote
                    className="cursor-pointer"
                    onClick={() => setEditingTitle(true)}
                    style={{
                      backgroundColor: "var(--primary)",
                      width: "30px",
                      height: "30px",
                      borderRadius: "100%",
                      position: "absolute",
                      bottom: "0",
                      right: "-100px",
                      color: "black",
                    }}
                  />
                </h1>
              </div>
            )}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
