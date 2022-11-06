import React, { useEffect, useState, useContext } from "react";
import { Container, TextField, Button, Stack } from "@mui/material";
import Post from "./Post";
import axios from "axios";
import { SpotifyApi, User, ProfileImage } from "./Dashboard";

export default function Explore({ track, chooseTrack }) {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const spotifyApi = useContext(SpotifyApi);
  const user = useContext(User);
  const profileImage = useContext(ProfileImage);

  const handleClick = () => {
    if (track) {
      setPosts([...posts, { text: inputText, track: track, date: new Date() }]);
      setInputText("");
      setError(false);

      axios
        .post("http://localhost:3001/post/create", {
          user: user,
          track: track,
          content: { text: inputText, data: new Date() },
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <TextField
            value={inputText}
            placeholder="Create a new stamp!"
            onChange={(e) => setInputText(e.target.value)}
            multiline={true}
            rows={3}
            type="string"
            fullwidth={inputText.toString()}
          />
          <Button variant="contained" size="large" onClick={handleClick}>
            Post
          </Button>
          {error ? <p>There is no playing song!</p> : <p></p>}
          <div>
            {posts.map((post) => {
              return (
                <Post
                  text={post.text}
                  track={post.track}
                  chooseTrack={chooseTrack}
                  user={user}
                  profileImage={profileImage}
                  date={post.date}
                />
              );
            })}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
