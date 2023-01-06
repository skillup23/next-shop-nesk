import Product from "../../models/Product";
import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  //удаляем всех предыдущих пользователей в модели
  await User.deleteMany();
  //вставляем пользователей из data.js
  await User.insertMany(data.users);
  //удаляем все товары
  await Product.deleteMany();
  //вставляем товары из data.js
  await Product.insertMany(data.products);
  await db.disconnect();
  //если все операции успешны, то оповестим об этом
  res.send({ message: "seedjs успешно выполнен" });
};

export default handler;
