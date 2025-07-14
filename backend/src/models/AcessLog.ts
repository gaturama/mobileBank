import mongoose from "mongoose";

const acessLogSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  data_login: { type: Date, default: Date.now },
  ip_origem: String,
  device: String,
  status: { type: String, enum: ["sucesso", "falha"] },
});

export default mongoose.model("AcessLog", acessLogSchema);