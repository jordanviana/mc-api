const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ModelSchema = new mongoose.Schema(
	{
		nome: { type : String, required : true },
		nome_exibe: { type : String },
        destaque: { type: Boolean, default: false },
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

const Model = mongoose.model('Categoria', ModelSchema);
module.exports = Model;        