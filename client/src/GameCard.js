import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function GameCard({ image, title, description, link }) {
  return (
    <Card sx={{ maxWidth: 345, border: "1px solid black" }}>
      <CardActionArea>
        <CardMedia
          sx={{ marginTop: "2px" }}
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <NavLink style={{}} to={link}>
          <Button variant="contained" size="small" color="primary">
            Play
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
