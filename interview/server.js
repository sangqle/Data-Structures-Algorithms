const express = require("express");
const { exec } = require("child_process");


// Create server
const app = express();

app.use("/public", express.static(__dirname + "/public"));

// exec(
//   "browserify ./public/board.js > ./public/bundle.js",
//   (err, stdout, stderr) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   }
// );
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
