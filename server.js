const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve files from ROOT
app.use(express.static(__dirname));

// ✅ Root page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Plugin connect
let connectedPlugins = {};

app.post("/connect-plugin", (req, res) => {
    const userId = uuidv4();
    connectedPlugins[userId] = true;

    console.log("Plugin connected:", userId);

    res.json({
        success: true,
        userId,
        message: "Connected successfully"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Hez AI running on port", PORT);
});
