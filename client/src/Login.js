import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=50e42cdb020a42d2800b862c96207590&response_type=code&redirect_uri=http://localhost:3000/dashboard&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-read%20user-top-read%20user-follow-modify";

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
}
