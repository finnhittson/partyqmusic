const express = require("express");
const { UsersModel } = require("../models/users");

const router = express.Router();

// sanity check
router.get("/ping", (req, res) => {
	res.send("pong!");
});

// add users to db
router.post("/addUser", async (req, res) => {
	const userId = req.body['params']['userId'];
	const user = await UsersModel.find({userId: userId});
	//await UsersModel.deleteMany();
	
	if (user.length != 0) {
		//console.log("User already in db");
		return;
	}

	const userName = req.body['params']['name'];
	const topArtistNames = req.body['params']['topArtistNames'];
	const topArtistPics = req.body['params']['topArtistPics'];
	const topTrackNames = req.body['params']['topTrackNames'];
	const topTrackPics = req.body['params']['topTrackPics'];
	const bio = req.body['params']['bio'];
	const newUser = new UsersModel(
		{
			userId: userId, 
			name: userName.toLowerCase(), 
			topArtistNames: topArtistNames,
			topArtistPics: topArtistPics,
			topTrackNames: topTrackNames,
			topTrackPics: topTrackPics,
			bio: bio
		});
	if (userId) {
		try {
			await newUser.save();
			res.status(200).json({
				id: String(newUser._id),
			})
		} catch (e) {
			console.log(e);
			res.status(500).send("database error");
		}
	}
});

// gets all users from db
router.get("/users", async (req, res) => {
	try {
		const users = await UsersModel.find({});
		res.status(200).json({
        "users": {
          "users":users, 
          "id": users._id
        }
      });
	} catch (e) {
		console.error(e);
		res.status(500).send("database error");
	}
});

// get user from db
router.get("/user", async (req, res) => {
	const key = req.query.key;
	const type = req.query.type;
	if (key) {
		try {
			var user = await UsersModel.find({name: key.toLowerCase()});
			if (type == "id")
				user = await UsersModel.find({userId: key});
			res.status(200).json({
        "user": {
          "user":user, 
          "id": user._id
        }
      });
		} catch (e) {
			console.error(e);
			res.status(500).send("database error");
		}
	}
});

// serach user name
router.get("/searchUser", async (req, res) => {
	const key = req.query.key;
	try {
		var user = await UsersModel.find({name: key.toLowerCase()});
		res.status(200).json({
	    "user": {
	      "user":user, 
	      "id": user._id
	    }
	  });
	} catch (e) {
		console.error(e);
		res.status(500).send("database error");
	}
});

// updates user bio
router.post("/updateBio", async (req, res) => {
	const userId = req.body['params']['userId'];
	const bio = req.body['params']['bio'];
	try {
		const user = await UsersModel.find({userId: userId});
		user[0].bio = bio;		
		await user[0].save();
		res.status(200).json({
			id: String(user._id),
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("database error");
	}
});

// get users followings
router.post("/follow", async (req, res) => {
	const userId = req.body.params.userId;
	const follow = req.body.params.follow;
	const type = req.body.params.type;
	try {
		const user = await UsersModel.find({userId: userId});
		var alreadyFollowing = false;
		for (var i = 0; i < user[0].following.length; i++) {
			if (user[0].following[i] === follow) {
				if (type === "follow")
					alreadyFollowing = true;
				else if (type === "unfollow")
					user[0].following.splice(i,1);
			}
		}
		if (!alreadyFollowing && type === "follow")
			user[0].following.push(follow);
		await user[0].save();
		res.status(200).json({
			id: String(user._id),
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("database error");
	}
});

/*
 * Party portion
 */

// get party name and song queue
router.get("/party", async (req, res) => {
	const userId = req.query.userId;
	if (userId) {
		try {
			var user = await UsersModel.find({userId: userId});
			res.status(200).json({
				"party" : {
					"partyname": user.partyname,
					"songqueue": user.songqueue
				}
			});
		} catch (e) {
			console.error(e);
			res.status(500).send("database error")
		}
	}
});

// create party
router.post("/createParty", async (req, res) => {
	const userId = req.body['params']['userId'];
	const partyname = req.body['params']['userId'];
	try {
		const user = await UsersModel.find({userId: userId});
		user[0].partyname = partyname;
		await user[0].save();
		res.status(200).json({
			id: String(user._id)
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("database error");
	}
});

router.post("/queueSong", async (req, res) => {
	const userId = req.body['params']['userId'];
	const songId = req.body['params']['songId'];
	try {
		const user = await UsersModel.find({userId: userId});
		user[0].songqueue.push(songId);
		await user[0].save();
		res.status(200).json({
			id: String(user._id)
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("database error");
	}
});

router.post("/deleteParty", async (req, res) => {
	const userId = req.body['params']['userId'];
	try {
		const user = await UsersModel.find({userId: userId});
		user[0].partyname = "";
		user[0].songqueue = [];
		await user[0].save();
		res.status(200).json({
			id: String(user._id)
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("database error");
	}
});

module.exports = router;