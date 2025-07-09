import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  titulo: String,
  mensagem: String,
  data_envio: { type: Date, default: Date.now },
  lida: { type: Boolean, default: false },
});

export default mongoose.model("Notification", notificationSchema);
