import mongoose from 'mongoose'

const transferSchema = new mongoose.Schema({
    id_conta_origem: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    id_conta_destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null },
    tipo_transferencia: { type: String, enum: ['PIX', 'TED', 'DOC'] },
    valor: Number,
    descricao: String,
    data_transferencia: { type: Date, default: Date.now },
    status: { type: String, enum: ['pendente' , 'concluída', 'falha'], default: 'pendente' },
})

export default mongoose.model('Transfer', transferSchema)