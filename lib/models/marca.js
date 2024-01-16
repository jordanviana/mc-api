const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ModelSchema = new mongoose.Schema(
	{
		nome: { type : String, required : true },
        destaque: { type: Boolean, default: false },
        nome_exibe: String,
        categoria: {
            _id: String,
            nome: String,
            nome_exibe: String
        },
        empresa: {
            _id: String,
            nome: String
        },
        usuario: {
            _id: String,
            username: String
        }
	}
);

ModelSchema.plugin(timestamps);
ModelSchema.plugin(mongooseStringQuery);

const Model = mongoose.model('Marca', ModelSchema);
module.exports = Model;        