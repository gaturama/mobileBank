import mongoose from "mongoose";

const pixKeySchema = new mongoose.Schema({
  id_conta: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  tipo_chave: { type: String, enum: ["CPF", "telefone", "email", "aleatória"] },
  valor_chave: { type: String, unique: true },
  status: { type: String, enum: ["ativa", "inativa"], default: "ativa" },
});

export default mongoose.model("PixKey", pixKeySchema);
