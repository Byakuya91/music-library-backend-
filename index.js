// imports for Song backend.
const express = require("express");
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper");
// create app object for express.
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

//  POST a song to JSON
app.post("/api/songs", (req, res) => {
  // access the request made by the user
  const newSong = req.body;
  // adds new song to the songs JSON file
  const addedSong = repoContext.songs.createSong(newSong);
  // user sees the added song
  return res.send(addedSong);
});

// starting a server
//  Creating an environmental PORT variable
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server runnng on ${PORT}`);
});
