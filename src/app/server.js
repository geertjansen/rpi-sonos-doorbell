const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./logger");

const app = express();
app.use(bodyParser.json());

const port = 4004;

module.exports = {
  run: function () {
    app.use("/assets", express.static(path.join(__dirname, "../assets")));

    app.post("/api/chime", (req, res) => {
      require("./sonos")
        .playChime()
        .subscribe(() => {
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify({ data: null }));
        });
    });

    app.post("/api/voice-message", (req, res) => {
      require("./sonos")
        .playMessage(req.body.message, req.body.volume, req.body.zones)
        .subscribe(() => {
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify({ data: null }));
        });
    });

    app.get("/api/zones", (req, res) => {
      require("./sonos")
        .getAllZones()
        .subscribe((zones) => {
          res.setHeader("Content-Type", "application/json");
          res.send(JSON.stringify({ data: zones }));
        });
    });

    app.get("/api/events", (req, res) => {
      const events = require("./event-log").getAll();
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ data: events }));
    });

    app.get("/api/settings", (req, res) => {
      const settings = require("./settings").get();
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ data: settings }));
    });

    app.post("/api/settings", (req, res) => {
      try {
        require("./settings").update(req.body);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ data: null }));
      } catch {
        res.sendStatus(500);
      }
    });

    app.get("*", (req, res) => {
      res.setHeader("Content-type", "text/html");
      res.sendFile(path.join(__dirname, "./index.html"));
    });

    app.listen(port, () =>
      logger.log(`Doorbell app listening on port ${port}!`)
    );
  },
};
