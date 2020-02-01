const environment = require("../environments/environment");

module.exports = {
  log: function (message) {
    console.log(message);
  },

  debug: function (message) {
    if (environment.production) {
      console.log(message);
    }
  },
};
