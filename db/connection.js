const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

function connectMongo() {
  return mongoose.connect(process.env.DB_HOST);
}

module.exports = { connectMongo };
