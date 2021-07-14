const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ModelSchema = new mongoose.Schema(
	{
		nome: { type : String, required : true },
        destaque: { type: Boolean, default: false },
        categoria: {
            _id: String,
            nome: String
        },
        subcategoria: {
            _id: String,
            nome: String
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

const Model = mongoose.model('Tipoproduto', ModelSchema);
module.exports = Model;        