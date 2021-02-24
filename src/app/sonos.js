const axios = require("axios");
const qs = require("querystring");
const { forkJoin, from, of } = require("rxjs");
const { map, mapTo, catchError } = require("rxjs/operators");
const logger = require("./logger");
const environment = require("../environments/environment");

const baseUrl = "http://192.168.0.100:5005";

module.exports = {
  getAllZones: function () {
    if (environment.production) {
      const url = `${baseUrl}/zones`;
      return from(axios.get(url)).pipe(
        map((res) => {
          return res.data.map((zone) => {
            return {
              id: zone.uuid,
              name: zone.coordinator.roomName,
              checked: true,
            };
          });
        })
      );
    }
    return of([]);
  },
  playChime: function () {
    if (environment.production) {
      const volume = 65;
      const url = `${baseUrl}/clipall/ding-dong.wav/${volume}`;
      return from(axios.get(url)).pipe(
        mapTo(true),
        catchError((err) => {
          logger.debug(err);
          return of(true);
        })
      );
    }
    return of(true);
  },
  playMessage(message, volume, zones) {
    if (environment.production) {
      if (volume === undefined) {
        volume = 25;
      }
      if (zones === undefined) {
        const url = `${baseUrl}/sayall/${qs.escape(message)}/nl-nl/${volume}`;
        let req$;
        try {
          req$ = from(axios.get(url)).pipe(mapTo(true));
        } catch (error) {
          console.error("couldn't play on sonos");
          req$ = of(true);
        }
        return req$;
      } else {
        return forkJoin(
          zones.map((zone) => {
            const url = `${baseUrl}/${qs.escape(zone)}/say/${qs.escape(
              message
            )}/nl-nl/${volume}`;
            return from(axios.get(url));
          })
        ).pipe(mapTo(true));
      }
    }
    return of(true);
  },
};
