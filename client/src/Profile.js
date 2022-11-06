import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Container,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { Form } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import TrackSearchResult from "./TrackSearchResult";
import "./Profile.css";
import { ParentUserId, SpotifyApi, AccessToken } from "./Dashboard";
import { Context } from "./Context";

export default function Profile({ chooseTrack }) {
  const parentUserId = useContext(ParentUserId);
  const spotifyApi = useContext(SpotifyApi);
  const accessToken = useContext(AccessToken);

  const [activeUserId, setActiveUserId] = useContext(Context);

  const [user, setUser] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [following, setFollowing] = useState([]); // array of followers id's of the active user
  const [followers, setFollowers] = useState(0); // tally count of how many followers active user has
  const [playlistPics, setPlaylistPics] = useState([]); // array of their public playlist images
  const [playlistNames, setPlaylistNames] = useState([]); // array of their public playlist names
  const [userPosts, setUserPosts] = useState({}); // dictionary of active users posts

  const [topTrackNames, setTopTrackNames] = useState([]);
  const [topTrackPics, setTopTrackPics] = useState([]);
  const [topArtistNames, setTopArtistNames] = useState([]);
  const [topArtistPics, setTopArtistPics] = useState([]);

  const imgDim = "200"; // carousel image dimensions

  const [bio, setBio] = useState("");
  const [bioElement, setBioElement] = useState([]);
  const [showBioTextField, setShowBioTextField] = useState("0");

  const [fatal, setFatal] = useState(false);

  // gets users bio from db
  useEffect(() => {
    if (!activeUserId) return;
    axios
      .get("http://localhost:3001/users/user", {
        params: { key: activeUserId, type: "id" },
      })
      .then((res) => {
        if (res.data.user.user.length !== 0) {
          setBio(res.data.user.user[0].bio);
          setShowBioTextField("1");
        } else {
          setShowBioTextField("0");
        }
      });
  }, [activeUserId]);

  // update bio
  useEffect(() => {
    if (!bio) return;
    axios
      .post("http://localhost:3001/users/updateBio", {
        params: {
          userId: activeUserId,
          bio: bio,
        },
      })
      .then((res) => {
        // bio updated
      });
  }, [bio, activeUserId]);

  // bio modification on page
  useEffect(() => {
    if (activeUserId !== parentUserId) {
      setBioElement("No bio yet...");
      return;
    }
    if (showBioTextField === "1" && bio.length !== 0) {
      setBioElement(
        <div>
          <p>{bio}</p>
          <Button onClick={() => setShowBioTextField("0")} key="save">
            Edit Bio
          </Button>
        </div>
      );
    } else {
      setBioElement(
        <div>
          <TextareaAutosize
            id="textarea"
            defaultValue={bio}
            style={{ width: "100%" }}
          />
          <Button
            onClick={() => {
              setShowBioTextField("1");
              setBio(document.getElementById("textarea").value);
            }}
            key="edit"
          >
            Save Bio
          </Button>
        </div>
      );
    }
  }, [bio, showBioTextField, activeUserId]);

  // adds active user to db
  useEffect(() => {
    if (fatal || !activeUserId || !user) {
      return;
    }
    axios
      .post("http://localhost:3001/users/addUser", {
        params: {
          userId: parentUserId,
          name: user,
          topArtistNames: topArtistNames,
          topArtistPics: topArtistPics,
          topTrackNames: topTrackNames,
          topTrackPics: topTrackPics,
          bio: bio,
        },
      })
      .then((res) => {
        // user added or not added to db
      });
    setFatal(true);
  }, [activeUserId, user]);

  // sets the user name, profile image and number of followes active user has
  useEffect(() => {
    if (!accessToken || !activeUserId) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUser(activeUserId).then((res) => {
      setUser(res.body.display_name);
      setProfileImage(res.body.images[0].url);
      setFollowers(res.body.followers.total);
    });
  }, [accessToken, activeUserId, spotifyApi]);

  // sets the active users playlist images and names
  useEffect(() => {
    if (!accessToken || !activeUserId) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists(activeUserId).then((res) => {
      var playlistPics = [];
      var playlistNames = [];
      for (var i = 0; i < res.body.items.length; i++) {
        playlistPics.push(res.body.items[i].images[0].url);
        playlistNames.push(res.body.items[i].name);
      }
      setPlaylistPics(playlistPics);
      setPlaylistNames(playlistNames);
    });
  }, [accessToken, activeUserId, spotifyApi]);

  // get users top tracks/songs from spotifyApi or db
  useEffect(() => {
    if (!accessToken || !activeUserId) return;
    if (activeUserId === parentUserId) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMyTopTracks().then(
        (res) => {
          var topTrackNames = [];
          var topTrackPics = [];
          for (var i = 0; i < res.body.items.length; i++) {
            topTrackNames.push(res.body.items[i].name);
            topTrackPics.push(res.body.items[i].album.images[0].url);
          }
          setTopTrackNames(topTrackNames);
          setTopTrackPics(topTrackPics);
          // write this info do db
        },
        (err) => {
          console.log("Something went wrong!", err);
        }
      );
    } else {
      // get top artists from db
      axios
        .get("http://localhost:3001/users/user", {
          params: { key: activeUserId, type: "id" },
        })
        .then((res) => {
          setTopTrackNames(res.data.user.user[0].topTrackNames);
          setTopTrackPics(res.data.user.user[0].topTrackPics);
        });
    }
  }, [accessToken, activeUserId, spotifyApi, user]);

  // get top artists from spotifyApi or db
  useEffect(() => {
    if (!accessToken || !activeUserId) return;
    if (activeUserId === parentUserId) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMyTopArtists().then(
        (res) => {
          var topArtistNames = [];
          var topArtistPics = [];
          for (var i = 0; i < res.body.items.length; i++) {
            topArtistNames.push(res.body.items[i].name);
            topArtistPics.push(res.body.items[i].images[0].url);
          }
          setTopArtistNames(topArtistNames);
          setTopArtistPics(topArtistPics);
          // write this info to db
        },
        (err) => {
          console.log("Something went wrong!", err);
        }
      );
    } else {
      // get top artists from db
      axios
        .get("http://localhost:3001/users/user", {
          params: { key: activeUserId, type: "id" },
        })
        .then((res) => {
          setTopArtistNames(res.data.user.user[0].topArtistNames);
          setTopArtistPics(res.data.user.user[0].topArtistPics);
        });
    }
  }, [accessToken, activeUserId, spotifyApi]);

  // gets the posts from the database of the active user
  useEffect(() => {
    if (!user) return;
    axios
      .get("http://localhost:3001/post/getbyuser", { params: { user: user } })
      .then((res) => {
        setUserPosts(res.data.posts);
      });
  }, [user]);

  // gets the followings from the database
  useEffect(() => {
    if (!activeUserId) return;
    axios
      .get("http://localhost:3001/users/user", {
        params: { key: parentUserId, type: "id" },
      })
      .then((res) => {
        setFollowing(res.data.user.user[0].following);
      });
  }, [activeUserId]);

  function enterSearch(e) {
    if (e.code === "Enter") {
      axios
        .get("http://localhost:3001/users/searchUser", {
          params: { key: e.target.value },
        })
        .then((res) => {
          if (res.data.user.user.length !== 0) {
            //console.log(res.data.user.user[0].userId);
            setActiveUserId(res.data.user.user[0].userId);
            setUser(res.data.user.user[0].name);
          } else {
            alert("No user under that name.");
          }
        });
    }
  }

  return (
    <Container id="container">
      <Form.Control
        type="search"
        placeholder="Search Other Users"
        onKeyUp={(e) => enterSearch(e)}
      />

      <div className="userInfoLevel">
        <div className="userInfo">
          <img src={profileImage} alt="" height="150" id="profilePic" />
        </div>

        <div className="userInfo">
          <div id="name">
            <h4>{user}</h4>
            <p>
              Followers: {followers} Following: {following.length}
            </p>
          </div>
        </div>

        <div className="userInfo">
          <div id="followButton">
            {followButton(
              activeUserId,
              parentUserId,
              accessToken,
              spotifyApi,
              following
            )}
          </div>
        </div>
      </div>

      <div id="bio">
        <h3>Bio:</h3>
        <div>{bioElement}</div>
      </div>

      <div className="carousel">
        <div className="subCarousel">
          <Carousel
            autoPlay={true}
            interval={10000}
            infiniteLoop={true}
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            width={200}
            stopOnHover={true}
          >
            {buildCarousel(playlistPics, playlistNames, imgDim)}
          </Carousel>
        </div>

        <div className="subCarousel">
          <Carousel
            autoPlay={true}
            interval={10000}
            infiniteLoop={true}
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            width={200}
            stopOnHover={true}
          >
            {buildCarousel(topTrackPics, topTrackNames, imgDim)}
          </Carousel>
        </div>

        <div className="subCarousel">
          <Carousel
            autoPlay={true}
            interval={10000}
            infiniteLoop={true}
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            width={200}
            stopOnHover={true}
          >
            {buildCarousel(topArtistPics, topArtistNames, imgDim)}
          </Carousel>
        </div>
      </div>

      <div
        style={{ maxHeight: "300px", overflowY: "scroll", marginTop: "20px" }}
      >
        <h6>Posts</h6>
        <div>{buildPosts(userPosts, profileImage, chooseTrack)}</div>
      </div>
    </Container>
  );
}

// builds react carousel -> CHANGE TO MUI CAROUSEL
function buildCarousel(pictures, names, imgDim) {
  const carouselContents = [];
  for (var i = 0; i < pictures.length; i++) {
    carouselContents.push(
      <div key={String(names[i])}>
        <img
          src={String(pictures[i])}
          height={imgDim}
          width={imgDim}
          alt=""
          id="carouselPicture"
        />
      </div>
    );
  }
  return carouselContents;
}

// builds react element of active users post history
function buildPosts(userPosts, profileImage, chooseTrack) {
  const publishedPosts = [];
  if (userPosts.length !== 0) {
    for (var j = 0; j < userPosts.length; j++) {
      publishedPosts.push(
        <div key={String(userPosts[j]._id)}>
          <Card variant="outlined">
            <CardContent>
              <CardHeader
                avatar={<Avatar src={profileImage} />}
                title={userPosts[j].creator}
                subheader={userPosts[j].create_date}
              />
              <p>{userPosts[j].content.text}</p>
              <TrackSearchResult
                track={userPosts[j].track}
                chooseTrack={chooseTrack}
              />
            </CardContent>
          </Card>
        </div>
      );
    }
  }
  return publishedPosts;
}

// builds react element follow button
function followButton(
  activeUserId,
  parentUserId,
  accessToken,
  spotifyApi,
  following
) {
  if (activeUserId === parentUserId) return;

  const button = [];
  var buttonText = "Follow";
  let alreadyFollowing = false;

  const follow = () => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.followUsers([activeUserId]).then(
      (res) => {
        console.log("Followed!", res);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
    // updates the dp with the new following
    axios
      .post("http://localhost:3001/users/follow", {
        params: { userId: parentUserId, follow: activeUserId, type: "follow" },
      })
      .then((res) => {
        console.log("Followed to database", res);
      });
  };

  const unfollow = () => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.unfollowUsers([activeUserId]).then(
      (res) => {
        console.log("Unfollowed!", res);
      },
      (err) => {
        console.log("Something went wrong!", err);
      }
    );
    // updates the dp with the new unfollowing
    axios
      .post("http://localhost:3001/users/follow", {
        params: {
          userId: parentUserId,
          follow: activeUserId,
          type: "unfollow",
        },
      })
      .then((res) => {
        console.log("Unfollowed to database", res);
      });
  };

  for (var i = 0; i < following.length; i++) {
    if (activeUserId === following[i]) alreadyFollowing = true;
  }

  if (alreadyFollowing) {
    buttonText = "Unfollow";
    button.push(
      <div key="followButton">
        <Button variant="contained" size="large" onClick={unfollow}>
          {buttonText}
        </Button>
      </div>
    );
  } else {
    button.push(
      <div key="followButton">
        <Button variant="contained" size="large" onClick={follow}>
          {buttonText}
        </Button>
      </div>
    );
  }
  return button;
}
