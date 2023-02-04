const mongoose = require("mongoose");

const user = mongoose.model(
  "users",
  new mongoose.Schema({
    //add user infos
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
      },
    ],
  })
);

module.exports = user;