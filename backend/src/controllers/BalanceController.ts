import { Request, Response } from 'express';
import Account from '../models/Account';

export const addBalance = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(400).json({error: "Usuário não autenticado"});

        const { valor } = req.body;
        if (!valor || valor <= 0 ) return res.status(400).json({error: "Valor inválido"});    
    
        const conta = await Account.findOne({ userId });
        if (!conta) return res.status(404).json({error: "Conta não encontrada"});

        conta.saldo += valor;
        await conta.save();

        return res.json({ message: `Adicionado R$ ${valor} ao saldo da conta`, saldoAtual: conta.saldo });
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}