const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.join(__dirname, "../assets/db.json"));

module.exports = low(adapter);
