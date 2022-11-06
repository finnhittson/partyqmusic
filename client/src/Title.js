import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { User, ProfileImage } from "./Dashboard";

export default function Title() {
  return (
    <div>
      <Container className="d-flex flex-row py-2">
        <h1>Party Q Music</h1>
      </Container>
    </div>
  );
}
