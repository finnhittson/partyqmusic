import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function PartyDashboard({ userId, partyName }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createLeaderboardData(name, likes, dislikes, score, numSongsPlayed) {
    return { name, likes, dislikes, score, numSongsPlayed };
  }

  const leaderboardRows = [
    createLeaderboardData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createLeaderboardData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createLeaderboardData("Eclair", 262, 16.0, 24, 6.0),
    createLeaderboardData("Cupcake", 305, 3.7, 67, 4.3),
    createLeaderboardData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  function createHistoryData(song, artist, user) {
    return { song, artist, user };
  }

  const historyRows = [
    createHistoryData("Frozen yoghurt", 159, 6.0),
    createHistoryData("Ice cream sandwich", 237, 9.0),
    createHistoryData("Eclair", 262, 16.0),
  ];

  function LeaderBoard() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name </StyledTableCell>
              <StyledTableCell>Likes</StyledTableCell>
              <StyledTableCell>Dislikes</StyledTableCell>
              <StyledTableCell>Total Score</StyledTableCell>
              <StyledTableCell>Songs Played</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardRows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.likes}</StyledTableCell>
                <StyledTableCell>{row.dislikes}</StyledTableCell>
                <StyledTableCell>{row.score}</StyledTableCell>
                <StyledTableCell>{row.numSongsPlayed}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function History() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Song Title</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
              <StyledTableCell>Played By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyRows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.song}</StyledTableCell>
                <StyledTableCell>{row.artist}</StyledTableCell>
                <StyledTableCell>{row.user}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <Container>
      <h1>
        Welcome to the party: <u>{partyName}</u> !
      </h1>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Song Title
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Artist Name
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Typography sx={{ margin: "5px" }} component="div" variant="h6">
              Played by:
            </Typography>
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
            <IconButton>
              <ThumbDownIcon />
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="image"
          alt="album cover"
        />
      </Card>
      <LeaderBoard />
      <History />
    </Container>
  );
}
