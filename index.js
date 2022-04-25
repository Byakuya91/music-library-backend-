// imports for Song backend.
const express = require("express");
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper");
const songValidate = require("./middleware/songValidation");
const songLogger = require("./middleware/song-logger");
// create app object for express.
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint construction

// GET ALL SONGS
app.get("/api/songs", (req, res) => {
  // finding all the songs
  const songs = repoContext.songs.findAllSongs();
  // returning that information to the client
  return res.send(songs);
});

// GET  SONGS by id
app.get("/api/songs/:id", (req, res) => {
  // getting the song by id from client
  const id = req.params.id;
  //  finding the song within the JSON file
  const songs = repoContext.songs.findSongById(id);
  //  return a request back to the user.
  return res.send(songs);
});

//  POST a new song to JSON
app.post("/api/songs", [songLogger, songValidate], (req, res) => {
  // access the request made by the user
  const newSong = req.body;
  // adds new song to the songs JSON file
  const addedSong = repoContext.songs.createSong(newSong);
  // user sees the added song
  return res.send(addedSong);
});
//  PUT a new Song inside.
app.put("/api/songs/:id", (req, res) => {
  // grabbing id of the requested song
  const id = parseInt(req.params.id);
  // user sending the entire object with all its properties.
  const songPropertiesToModify = req.body;
  //  updating the JSON Song file with the requested information from client.
  const songToUpdate = repoContext.songs.updateSong(id, songPropertiesToModify);
  // returning the updated song back to the client.
  return res.send(songToUpdate);
});
//  DELETE a song
app.delete("/api/songs/:id", (req, res) => {
  // grabbing id of the requested song
  const id = parseInt(req.params.id);
  //  remove the song
  const deletedSong = repoContext.songs.deleteSong(id);
  // returning the deleted song back to the client.
  return res.send(deletedSong);
});

// starting a server
//  Creating an environmental PORT variable
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server runnng on ${PORT}`);
});
