const express = require("express");
const cors = require("cors");
const path = require("path");

const { Server } = require("@tus/server");
const { FileStore } = require("@tus/file-store");

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");

const tusServer = new Server({
  path: "/files",
  datastore: new FileStore({
    directory: uploadDir,
  }),
});

app.use("/files", (req, res) => {
  tusServer.handle(req, res);
});

app.get("/", (req, res) => {
  res.send("TUS backend running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
