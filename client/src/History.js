import React, { useContext, useState } from "react";
import TrackSearchResult from "./TrackSearchResult";
import { TrackHistory } from "./Dashboard";
import { Button, Container } from "@mui/material";
import { ParentUserId, SpotifyApi, AccessToken } from "./Dashboard";

export default function Histoy({ chooseTrack }) {
  const trackHistory = useContext(TrackHistory);
  // const spotifyApi = useContext(spotifyApi);
  const parentUserId = useContext(ParentUserId);
  const spotifyApi = useContext(SpotifyApi);
  const accessToken = useContext(AccessToken);

  const [done, isDone] = useState(false);
  const handleClick = () => {
    //create playlist
    isDone(true);
  };

  return (
    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
      <Container style={{ border: "1px solid black" }}>
        {trackHistory.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </Container>
      {done ? (
        <p>"Playlist was saved to spotify"</p>
      ) : (
        <Button variant="contained" size="large" onClick={handleClick}>
          Create Playlist
        </Button>
      )}
    </div>
  );
}
