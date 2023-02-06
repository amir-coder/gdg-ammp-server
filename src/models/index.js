const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

db.user = require("./users.model");
db.role = require("./role.model");

db.ROLES = ["hr", "member", "admin"];

module.exports = db;