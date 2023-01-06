import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    article: { type: String, require: true, unique: true },
    category: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    brand: { type: String, require: true },
    power: { type: String, require: true },
    cableLength: { type: String, require: true },
    connector: { type: String, require: true },
    countInStock: { type: Number, require: true, default: 0 },
    description: { type: String, require: true },
  },
  {
    timestamps: true, // время создания и обновления документа
  }
);

//если данная модель существует в mogoose, то не создаем, иначе добавляем модель
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
