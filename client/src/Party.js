import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Button,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";

import PartyDashboard from "./PartyDashboard";
import Games from "./Games";
import Geo from "./Geo";

export default function Party(userId) {
  const [partyName, setPartyName] = useState("");
  const [partyType, setPartyType] = useState("Local");
  const [inParty, setInParty] = useState(false);

  const toggleParty = () => {
    if (partyType === "Remote") {
      setPartyType("Local");
    } else {
      setPartyType("Remote");
    }
  };

  const handleClick = () => {
    axios
      .post("http://localhost:3001/party/create", {
        host: userId.userId,
        name: partyName,
        type: partyType.toLowerCase(),
      })
      .then((response) => {
        console.log(response);
        setInParty(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!inParty) {
    return (
      <div>
        <Container>
          <Stack spacing={2}>
            <h3>Host a party!</h3>
            <TextField
              required
              value={partyName}
              label="Party Name"
              onChange={(e) => setPartyName(e.target.value)}
            />
            <FormControlLabel
              control={<Switch onChange={toggleParty} />}
              label={partyType}
            />
            <Button variant="contained" size="large" onClick={handleClick}>
              Create Party
            </Button>
          </Stack>
          <Geo></Geo>
          <Games />
        </Container>
      </div>
    );
  } else {
    return <PartyDashboard userId={userId} partyName={partyName} />;
  }
}
