


const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxti20D1icS99bPog2FAdUAaBPQ2uXgJXio9QOXqSXWHajaDgIzMm8HrZXNzEZRsurqGA/exec"; // replace with your Apps Script URL

app.post("/waitlist", async (req, res) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      });
  
      // Check response status
      const text = await response.text(); // use text() for debugging
      console.log("Apps Script response:", text);
  
      // Try parsing JSON if possible
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { status: "unknown", raw: text };
      }
  
      res.json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});
