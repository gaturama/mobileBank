import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import accountRoutes from "./routes/accountRoutes";
import perfilRoutes from "./routes/perfilRoutes";
import balanceRoutes from "./routes/balanceRoutes";
import extratoRoutes from "./routes/StatementeRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api", protectedRoutes);
app.use("/api", accountRoutes);
app.use("/api/auth/usuario", perfilRoutes);
app.use("/api/auth", balanceRoutes);
app.use("/api/auth/", extratoRoutes);

app.get("/", (req, res) => {
  res.send("API Mobile Bank está online!");
});

mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
});