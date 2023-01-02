import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: String, require: true, default: false },
  },
  {
    timestamps: true, // время создания и обновления документа
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
