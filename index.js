const { forkJoin } = require("rxjs");
const { exhaustMap, tap } = require("rxjs/operators");

const {
  button,
  chime,
  eventLog,
  notifier,
  server,
  sonos,
} = require("./src/public-api");

button.start();

button
  .onPressed()
  .pipe(
    exhaustMap(() => forkJoin([chime.play(), sonos.playChime()])),
    tap(() => {
      eventLog.addOne();
      notifier.sendMessage();
    })
  )
  .subscribe();

server.run();
