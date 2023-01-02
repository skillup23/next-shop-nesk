import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connection = {};

async function connect() {
  if (connection.isConnnected) {
    console.log("все уже подключено");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnnected = mongoose.connections[0].readyState;
    if (connection.isConnnected === 1) {
      console.log("использовать предыдущее подключение");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("новое подключение");
  connection.isConnnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnnected = false;
    } else {
      console.log("подключено");
    }
  }
}

const db = { connect, disconnect };
export default db;
