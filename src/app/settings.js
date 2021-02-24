const db = require("./db");

module.exports = {
  get: function () {
    return db.get("settings").value();
  },
  getPushNotificationsEnabled: function () {
    return db.get("settings.pushNotificationsEnabled").value();
  },
  update: function (update) {
    return db
      .update("settings", (current) => ({ ...current, ...update }))
      .write();
  },
};
