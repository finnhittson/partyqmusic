import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Title from "./Title";
import MainPanel from "./MainPanel";
import { Context } from "./Context";
import Appbar from "./AppBar";

const spotifyApi = new SpotifyWebApi({
  clientId: "50e42cdb020a42d2800b862c96207590",
});

export const Lyrics = React.createContext();
export const TrackHistory = React.createContext();
export const SpotifyApi = React.createContext();
export const User = React.createContext();
export const ProfileImage = React.createContext();
export const AccessToken = React.createContext();
export const ParentUserId = React.createContext();

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [user, setUser] = useState("User");
  const [profileImage, setProfileImage] = useState("");
  const [trackHistory, setTrackHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [activeUserId, setActiveUserId] = useState("");

  function chooseTrack(track) {
    if (track === playingTrack) return;

    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });

    setTrackHistory(() => [...trackHistory, playingTrack]);
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((res) => {
      setUser(res.body.display_name);
      setProfileImage(res.body.images[0].url);
      setUserId(res.body.id);
      setActiveUserId(res.body.id);
    });
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Lyrics.Provider value={lyrics}>
      <TrackHistory.Provider value={trackHistory}>
        <SpotifyApi.Provider value={spotifyApi}>
          <User.Provider value={user}>
            <ProfileImage.Provider value={profileImage}>
              <AccessToken.Provider value={accessToken}>
                <Context.Provider value={[activeUserId, setActiveUserId]}>
                  <ParentUserId.Provider value={userId}>
                    <Container
                      className="d-flex flex-column py-2"
                      style={{ height: "100vh" }}
                    >
                      <Title />
                      <Appbar user={user} profileImage={profileImage} />
                      <Form.Control
                        type="search"
                        placeholder="Search Songs/Artists"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div
                        className="flex-grow-1 my-2"
                        style={{ overflowY: "auto" }}
                      >
                        {searchResults.map((track) => (
                          <TrackSearchResult
                            track={track}
                            chooseTrack={chooseTrack}
                          />
                        ))}
                        {searchResults.length === 0 && (
                          <MainPanel
                            track={playingTrack}
                            chooseTrack={chooseTrack}
                          />
                        )}
                      </div>
                      <div>
                        <Player trackUri={playingTrack?.uri} />
                      </div>
                    </Container>
                  </ParentUserId.Provider>
                </Context.Provider>
              </AccessToken.Provider>
            </ProfileImage.Provider>
          </User.Provider>
        </SpotifyApi.Provider>
      </TrackHistory.Provider>
    </Lyrics.Provider>
  );
}
