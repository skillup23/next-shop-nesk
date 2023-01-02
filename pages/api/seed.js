import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  //удаляем всех предыдущие пользователей в модели
  await User.deleteMany();
  //вставляем пользователей из data.js
  await User.insertMany(data.users);
  await db.disconnect();
  //если все операции успешны, то оповестим об этом
  res.send({ message: "seedjs успешно выполнен" });
};

export default handler;
