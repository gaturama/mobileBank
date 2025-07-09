import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
  saldo: number;
  status: "ativa" | "inativa";
  data_abertura: Date;
  agencia: string;
  numero_conta: string;
  userId: Schema.Types.ObjectId;
}

const AccountSchema = new Schema<IAccount>({
  saldo: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ["ativa", "inativa"],
    required: true,
    default: "ativa",
  },
  data_abertura: { type: Date, required: true, default: () => new Date() },
  agencia: { type: String, required: true },
  numero_conta: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Account = model<IAccount>("Account", AccountSchema);

export default Account;
