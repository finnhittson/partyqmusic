import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Table } from "@mui/material";
import { SpotifyApi, AccessToken } from "./Dashboard";

import ProgressBar from "react-customizable-progressbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function getId(trackURI) {
  let id = trackURI?.slice(trackURI.length - 22, trackURI.length);
  console.log(id);
  return id;
}

export default function Features({ track }) {
  const [audioFeatures, setAudioFeatures] = useState({});
  const spotifyApi = useContext(SpotifyApi);
  const accessToken = useContext(AccessToken);

  useEffect(() => {
    /* Get Audio Features for a Track */
    spotifyApi.getAudioFeaturesForTrack(getId(track?.uri)).then(
      (data) => {
        setAudioFeatures(data.body);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, [track]);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleClick = () => {
    spotifyApi.getMyTopArtists().then(
      function (data) {
        let topArtists = data.body.items;
        console.log(topArtists);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  var key = audioFeatures.key;
  var keyreturn = "C";
  if (key == 1) {
    keyreturn = "C#";
  }
  if (key == 2) {
    keyreturn = "D";
  }
  if (key == 3) {
    keyreturn = "D#";
  }
  if (key == 4) {
    keyreturn = "E";
  }
  if (key == 5) {
    keyreturn = "F";
  }
  if (key == 6) {
    keyreturn = "F#";
  }
  if (key == 7) {
    keyreturn = "G";
  }
  if (key == 8) {
    keyreturn = "G#";
  }
  if (key == 9) {
    keyreturn = "A";
  }
  if (key == 10) {
    keyreturn = "A#";
  }
  if (key == 11) {
    keyreturn = "B";
  }

  var mode = audioFeatures.mode;
  var modereturn = "Minor";
  if (mode == 1) {
    modereturn = "Major";
  }

  return (
    <div>
      <h2>Features</h2>

      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Acousticness: {audioFeatures.acousticness}</p>
            <ProgressBar
              progress={audioFeatures.acousticness}
              radius={30}
              steps={1}
              strokeWidth={5}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Danceability: {audioFeatures.danceability}</p>
            <ProgressBar
              progress={audioFeatures.danceability}
              radius={30}
              steps={1}
              strokeColor={"blue"}
              strokeWidth={5}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Energy: {audioFeatures.energy}</p>
            <ProgressBar
              progress={audioFeatures.energy}
              radius={30}
              steps={1}
              strokeColor={"indianred"}
              strokeWidth={5}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Liveness: {audioFeatures.liveness}</p>
            <ProgressBar
              progress={audioFeatures.liveness}
              radius={30}
              steps={1}
              strokeColor={"blue"}
              strokeWidth={5}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Loudness: {audioFeatures.loudness}</p>
            <ProgressBar
              progress={audioFeatures.loudness + 60}
              radius={30}
              steps={60}
              strokeColor={"indianred"}
              strokeWidth={5}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Instrumentalness: {audioFeatures.instrumentalness}</p>
            <ProgressBar
              progress={audioFeatures.instrumentalness}
              radius={30}
              steps={1}
              strokeColor={"blue"}
              strokeWidth={5}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Speechiness: {audioFeatures.speechiness}</p>
            <ProgressBar
              progress={audioFeatures.speechiness}
              radius={30}
              steps={1}
              strokeColor={"indianred"}
              strokeWidth={5}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Tempo: {audioFeatures.tempo}</p>
            <ProgressBar
              progress={audioFeatures.tempo}
              radius={30}
              steps={200}
              strokeColor={"blue"}
              strokeWidth={5}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Valence: {audioFeatures.valence}</p>
            <ProgressBar
              progress={audioFeatures.valence}
              radius={30}
              steps={200}
              strokeColor={"indianred"}
              strokeWidth={5}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Time Signature: {audioFeatures.time_signature}/4</p>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Key: {keyreturn}</p>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ background: "#ADD8E6" }}>
            <p>Major or Minor: {modereturn}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
