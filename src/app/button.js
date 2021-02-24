const rpio = require("rpio");
const { Subject } = require("rxjs");
const {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} = require("rxjs/operators");
const logger = require("./logger");

module.exports = {
  _buttonState: new Subject(),

  _onStateChange: function () {
    return this._buttonState.asObservable().pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((input) => !input)
    );
  },

  _pollcb(pin) {
    rpio.msleep(20);
    this._buttonState.next(rpio.read(12));
  },

  start: function () {
    rpio.open(12, rpio.INPUT, rpio.PULL_UP);
    rpio.poll(12, this._pollcb.bind(this), rpio.POLL_LOW);
    logger.debug("Button started!");
  },

  stop: function () {
    rpio.close(12);
    logger.debug("Button stopped!");
  },

  press: function () {
    this._buttonState.next(0);
  },

  release: function () {
    this._buttonState.next(1);
  },

  pressAndRelease: function () {
    this.press();
    this.release();
  },

  onPressed: function () {
    return this._onStateChange().pipe(filter((pressed) => pressed));
  },

  onReleased: function () {
    return this._onStateChange().pipe(filter((pressed) => !pressed));
  },
};
