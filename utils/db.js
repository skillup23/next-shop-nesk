import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connection = {};

async function connect() {
  //если мы уже подключены, то ничего делать не надо
  if (connection.isConnnected) {
    console.log("все уже подключено");
    return;
  }
  //если не подключены, то проверяем длину соединения
  if (mongoose.connections.length > 0) {
    connection.isConnnected = mongoose.connections[0].readyState;
    //и если равно 1, то подключение успешно
    if (connection.isConnnected === 1) {
      console.log("использовать предыдущее подключение");
      return;
    }
    //если не равно 1, то мы не в режиме подлючения
    await mongoose.disconnect();
  }

  //процесс подключения к БД
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("новое подключение");
  connection.isConnnected = db.connections[0].readyState;
}

//функция отключения. Проверяем соединение, если мы в режиме производства то отключаемся от бд и запускается
//в режиме разработки оставляем без изменений, дабы не отключаться и поключаться при каждом изменении кода
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
