import mongoose from "mongoose";

const fcmTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  plataforma: { type: String, enum: ["android", "ios", "web"], default: "web" },
  data_criacao: { type: Date, default: Date.now },
});

export default mongoose.model("FcmToken", fcmTokenSchema);
