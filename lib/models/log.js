const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ModelSchema = new mongoose.Schema(
	{
                log: String,
                user: {
                    _id: String,
                    nome: String
                },
                id_alvo: String,
                conteudo: String,
                data_hora: String,
                data: String,
                user_agent: String,
                error: String
	}
); 

ModelSchema.plugin(timestamps);
ModelSchema.plugin(mongooseStringQuery);

const Model = mongoose.model('Log', ModelSchema);
module.exports = Model;        