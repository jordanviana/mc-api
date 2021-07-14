const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');


const ModelSchema = new mongoose.Schema(
	{
		cod: Number,
		nome: String,
		ativo: Boolean
	}
);

ModelSchema.plugin(timestamps);
ModelSchema.plugin(mongooseStringQuery);

const Model = mongoose.model('Empresa', ModelSchema);


module.exports = Model;    


