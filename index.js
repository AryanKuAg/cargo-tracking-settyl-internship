const express = require("express");
const axios = require("axios").default;
const app = express();

// middleware
app.use(express.json());

// port
const port = process.env.PORT || "8085";

// GET /
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.google.com");
    if (response) {
      console.log(response.data);
    }
  } catch (e) {
    console.log(e);
  }

  res.send("hey world!");
});

// listener
app.listen(port, () => {
  console.log("The Server is up and running on port", port);
});
