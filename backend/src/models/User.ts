import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nome_completo: String, 
    cpf: { type: String, unique: true },
    email: { type: String, unique: true },
    telefone: String,
    senha_hash: String,
    data_nascimento: Date,
    endereco: String,
    data_criacao: { type: Date, default: Date.now },
    biometria_ativa: { type: Boolean, default: false },
    autenticacao_2fa: { type: Boolean, default: false },
})

export default mongoose.model('User', userSchema)