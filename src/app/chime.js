const path = require("path");
const Sound = require("node-aplay");
const { from, of } = require("rxjs");
const environment = require("../environments/environment");

module.exports = {
  play: function () {
    if (environment.production) {
      const file = path.join(__dirname, "../assets/ding-dong.wav");
      return from(
        new Promise(function (resolve) {
          const player = new Sound(file);
          player.on("complete", function () {
            resolve(true);
          });
          player.play();
        })
      );
    }
    return of(true);
  },
};
