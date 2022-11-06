import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import TrackSearchResult from "./TrackSearchResult";
import FavoriteIcon from "@mui/icons-material/Favorite";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
var yyyy = today.getFullYear();

var mn = String(today.getMinutes()).padStart(2, "0");
var hr = String(today.getHours() % 12).padStart(2);

today = mm + "/" + dd + "/" + yyyy + " at " + hr + ":" + mn;

export default function Post({
  text,
  track,
  chooseTrack,
  user,
  profileImage,
  date,
}) {
  const handleClick = () => {
    console.log("liked post");
  };

  return (
    <Card variant="outlined">
      <CardContent style={{ backgroundColor: "lightblue" }}>
        <CardHeader
          style={{ backgroundColor: "white" }}
          avatar={<Avatar src={profileImage} />}
          title={user}
          subheader={today}
          action={
            <IconButton
              sx={{ color: "grey", "&:hover": { color: "#E67272" } }}
              onClick={handleClick}
            >
              <FavoriteIcon />
            </IconButton>
          }
        />
        <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
          {text}
        </Typography>
        <TrackSearchResult track={track} chooseTrack={chooseTrack} />
      </CardContent>
    </Card>
  );
}
