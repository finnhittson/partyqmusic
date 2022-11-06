import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
} from "@mui/material";

export default function Post({ user, profileImage, partyName, host }) {
  const handleClick = () => {
    console.log("Join party " + user);
  };

  return (
    <Card variant="outlined">
      <CardContent style={{ backgroundColor: "lightblue" }}>
        <CardHeader
          style={{ backgroundColor: "white" }}
          avatar={<Avatar src={profileImage} />}
          title={partyName}
          subheader={host}
          action={
            <IconButton
              sx={{ color: "grey", "&:hover": { color: "#E67272" } }}
              onclick={handleClick}
            ></IconButton>
          }
        />
      </CardContent>
    </Card>
  );
}
