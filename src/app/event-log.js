const db = require("./db");

module.exports = {
  addOne: function () {
    return db.get("events").push({ time: Date.now() }).write();
  },
  getAll: function () {
    return db.get("events").value();
  },
};
