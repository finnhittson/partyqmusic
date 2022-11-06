import React from "react";
import { Grid, Container } from "@mui/material";
import GameCard from "./GameCard";

export default function Games() {
  return (
    <Container sx={{ marginTop: "20px" }}>
      <h3>Party Games</h3>
      <p>Party Games Leaderboard coming soon...</p>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <GameCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfpp8cnb3knIrXmDfuXK6BznDr1zJE5H0pIFiM0aoXuSB4LJf69xV7XRpPuGLWOfDtzY&usqp=CAU"
            title="Lyric Guessing Game"
            description="First person in party to correctly fill in the missing lyrics gets a point. User with most points at end of song wins!"
            link="/lyricGame"
          />
        </Grid>
        <Grid item xs={3}>
          <GameCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39wTGQyIV6qkyfSxpoaneajrYfNBGTbblmR3SgpLgfbxHQB9k_9vYH8zdtHnaMkx29mY&usqp=CAU"
            title="Tetris"
            description="Classic tetris game"
            link="/tetris"
          />
        </Grid>
        <Grid item xs={3}>
          <GameCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHhW5VMAGkFBOamTZzvq9WT1AMbCyq9fJ14r3P54GL0fqx1Af68HLqdS0TsXvEPH0jvA&usqp=CAU"
            title="Snake"
            description="Classic snake game"
            link="/snake"
          />
        </Grid>
        <Grid item xs={3}>
          <GameCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiOduNp_Oc5AwtiEn7ZW94uVKlYIeZlDxqv9a87XHOYUyeuRImHpOinUKY3H-4qNI-B8w&usqp=CAU"
            title="Flappy Bird"
            description="Classic flappy bird game"
            link="/flappyBird"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
