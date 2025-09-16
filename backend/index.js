const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Fake buses (static for now)
let buses = [
  { id: 1, route: "A1", lat: 17.385, lng: 78.486, lastSeen: new Date() },
  { id: 2, route: "B2", lat: 17.391, lng: 78.481, lastSeen: new Date() }
];

// Endpoint: return all buses
app.get("/api/buses", (req, res) => {
  res.json(buses);
});

// Endpoint: return ETA for stop
app.get("/api/eta/:stopId", (req, res) => {
  const eta = Math.floor(Math.random() * 20) + 5; // 5–25 min
  res.json({ stopId: req.params.stopId, eta });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
