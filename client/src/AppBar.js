// Importing files from Material-UI
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HistoryIcon from "@mui/icons-material/History";
import LyricsIcon from "@mui/icons-material/LibraryMusic";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import Box from "@mui/material/Box";

// Exporting Default AppBar to the App.js File
export default function Appbar({ user, profileImage }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button
            button
            id="profile-button"
            color="inherit"
            aria-label="profile"
          >
            <AssignmentIndIcon />
          </Button>
          <Avatar alt="User Image" src={profileImage} />
          <Typography variant="h6" color="inherit">
            {<span>&nbsp;</span>} {user}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button button id="party-button" color="inherit" aria-label="party">
              <CelebrationIcon />
            </Button>
            <Button
              button
              id="explore-button"
              color="inherit"
              aria-label="explore"
            >
              <TravelExploreIcon />
            </Button>
            <Button
              button
              id="lyrics-button"
              color="inherit"
              aria-label="lyrics"
            >
              <LyricsIcon />
            </Button>
            <Button
              button
              id="history-button"
              color="inherit"
              aria-label="history"
            >
              <HistoryIcon />
            </Button>
            <Button
              button
              id="features-button"
              color="inherit"
              aria-label="feature"
            >
              <FeaturedPlayListIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
