import { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { AccessToken } from "./Dashboard";

export default function Player({ trackUri }) {
  const [play, setPlay] = useState(false)
  const accessToken = useContext(AccessToken);
  
  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}
