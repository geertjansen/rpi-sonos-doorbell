# rpi-sonos-doorbell
Raspberry Pi doorbell that triggers a chime on one or more Sonos speakers

## Installation

```sh
npm install
```

## Configuration

Push notifications are set up using an IFTTT applet. Create one where it sends a push notification on an email trigger with a `#doorbell` tag.

To configure the email service, create a `mail.conf.js` file in the root directory using the example below.

```js
// mail.conf.js
module.exports = {
  host: "smtp.gmail.com"
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "my-doorbell@gmail.com",
    pass: "p4ssw0rd!",
  },
};
```

## Run

```sh
npm start
```