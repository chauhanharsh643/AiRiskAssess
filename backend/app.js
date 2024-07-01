const express = require("express");
const app = express();
const cors = require("cors");
require("./database/db");
const auth = require("./router/auth");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use("/api/v1", auth);

app.listen(3000, () => {
    console.log("server started");
})