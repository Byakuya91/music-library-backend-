function songValidation(req, res, next) {
  //  grabs the request data of client
  let song = req.body;
  // object meant to do checks on JSON key,value pairs in products.JSON.
  let songs = [
    { name: "title", type: "string" },
    { name: "album", type: "string" },
    { name: "artist", type: "string" },
    { name: "genre", type: "string" },
    { name: "releaseDate", type: "string" },
  ];
  //     looping through the array of objects
  for (const song in songs) {
    if (
      // checking if property name is equal to the property type.
      song.hasOwnProperty(song.name) &&
      typeof (song[song.name] === song.type)
    ) {
      // proceed with the request
      continue;
      //    kicks out and tells client their info was not accepted.
    } else {
      return res.status(403).send("Song body not valid!");
    }
  }
  return next();
}
module.exports = songValidation;
