// Users model
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	userId: String,
	name: String,
	topArtistNames: [],
	topArtistPics: [],
	topTrackNames: [],
	topTrackPics: [],
	bio: String,
	partyname: String,
	songqueue: [],
	following: [],
});

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = { UsersModel };