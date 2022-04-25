// imports for Song backend.
const express = require("express");
cont cors =  require("cors");
// create app object for express.
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// starting a server
//  Creating an environmental PORT variable
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server runnng on ${PORT}`);
});
