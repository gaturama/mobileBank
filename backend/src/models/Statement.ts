import mongoose from 'mongoose'

const statementSchema = new mongoose.Schema({
    id_conta: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    tipo: { type: String, enum: ['crédito' , 'débito'] },
    descricao: String,
    valor: Number,
    data_movimentacao: { type: Date, default: Date.now },
})

export default mongoose.model('Statement', statementSchema)