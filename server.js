// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid"); // Make sure you installed uuid
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Store connected plugins
let connectedUsers = {}; // { userId: true }

app.post("/connect-plugin", (req, res) => {
    const userId = uuidv4();
    connectedUsers[userId] = true;

    res.json({
        userId,
        message: "✅ Plugin connected successfully"
    });
});

app.post("/send-message", (req, res) => {
    const { userId, message } = req.body;

    if (!connectedUsers[userId]) {
        return res.json({ error: "Plugin not connected" });
    }

    console.log(`[Hez AI] User ${userId} request: ${message}`);

    // Return audit log confirmation
    res.json({
        answer: `✅ Received request: "${message}" and sent to Roblox plugin`
    });
});

app.listen(3000, () => {
    console.log("✅ Hez AI server running at http://localhost:3000");
});
