require("dotenv").config();
const mongoose = require('mongoose');

async function initializeConnection(user, password, database) {
  if (mongoose.connection.readyState == 1) { return; }
  const uri = `mongodb+srv://${user}:${password}@cluster0.jlipv.mongodb.net/${database}?retryWrites=true&w=majority`;
  await mongoose.connect(uri);
  console.log("database connected");
}

function checkConnection() {
  return (mongoose.connection.readyState == 1);
}

async function initializeConnection() {
  user = process.env.DB_USER,
    password = process.env.DB_PASSWORD,
    database = process.env.DB_DATABASE
  const uri = `mongodb+srv://${user}:${password}@cluster0.jlipv.mongodb.net/${database}?retryWrites=true&w=majority`;
  await mongoose.connect(uri);
  console.log("database connected");
}

async function closeConnection() {
  await mongoose.connection.close();
}

module.exports = {
  initializeConnection, closeConnection, checkConnection
}