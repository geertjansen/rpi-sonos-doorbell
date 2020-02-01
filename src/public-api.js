module.exports = {
  button: require("./app/button"),
  chime: {
    play: require("./app/chime").play,
  },
  eventLog: require("./app/event-log"),
  notifier: require("./app/notifier"),
  server: require("./app/server"),
  sonos: {
    playChime: require("./app/sonos").playChime,
  },
};
