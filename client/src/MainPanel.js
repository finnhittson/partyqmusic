import React, { useState, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import History from "./History";
import Features from "./Features";
import Profile from "./Profile";
import Explore from "./Explore";
import Party from "./Party";
import { Lyrics } from "./Dashboard";
import { Stack, Link } from "@mui/material";
import styled from "styled-components";

export default function MainPanel({ track, chooseTrack }) {
  const [key, setKey] = useState("lyrics");
  const lyrics = useContext(Lyrics);

  const Year = styled.p`
    background-color: lightgrey;
    color: black;
    display: inline-block;
    padding: 2.2rem 1rem;
    font-size: 1.2rem;
    border: 1px solid black;
    margin: 20px;
  `;
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="explore" title="Explore">
        <Explore track={track} chooseTrack={chooseTrack} />
      </Tab>

      <Tab eventKey="profile" title="Profile">
        <Profile chooseTrack={chooseTrack} />
      </Tab>

      <Tab eventKey="party" title="Party">
        <Party />
      </Tab>

      <Tab eventKey="lyrics" title="Lyrics">
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {lyrics}
          <Stack direction="row">
            <Year>2022</Year>
            <Stack sx={{ margin: "20px" }}>
              <h1>Welcome!</h1>
              <h3>
                <Link href="https://discord.gg/y8cAw4rn">Join</Link>
                {""} discord development server
              </h3>
            </Stack>
          </Stack>
        </div>
      </Tab>

      <Tab eventKey="history" title="History">
        <p>History</p>
        <History chooseTrack={chooseTrack} />
      </Tab>

      <Tab eventKey="features" title="Features">
        <Features track={track} />
      </Tab>
    </Tabs>
  );
}
