import User from "../models/User";
import Account from "../models/Account";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      nome_completo,
      cpf,
      email,
      telefone,
      senha,
      data_nascimento,
      endereco,
    } = req.body;

    const userExists = await User.findOne({ $or: [{ cpf }, { email }] });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Usuário com esse CPF ou email já existe." });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome_completo,
      cpf,
      email,
      telefone,
      senha_hash,
      data_nascimento,
      endereco,
      data_criacao: new Date(),
      biometria_ativa: false,
      autenticacao_2fa: false,
    });

    await novoUsuario.save();

    const novaConta = new Account({
      userId: novoUsuario._id,
      numero_conta: Math.floor(100000 + Math.random() * 900000),
      agencia: "0001",
    });

    await novaConta.save();

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ error: "Erro interno no servidor " });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cpf, senha } = req.body;

    const user = await User.findOne({ cpf });
    if (!user?.senha_hash) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const payload = {
      id: user._id,
      nome_completo: user.nome_completo,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};