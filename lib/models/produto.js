const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ModelSchema = new mongoose.Schema(
	{
		nome: { type : String, required : true },
		descricao: { type : String },
        nome_destaque: { type: String },
        destaque: { type: Boolean, default: false },
        ref: { type : String},
        // cores: [
        //     {
        //         nome: String,
        //         cor: String,
        //         imagens: [
        //             {
        //                 link: String,
        //                 destaque: Boolean
        //             }
        //         ]
        //     }
        // ],
        imagens: [
            {
                url: String,
                ref: String,
                destaque: Boolean
            }
        ],
        categoria: {
            _id: String,
            nome: String,
            nome_exibe: String
        },
        subcategoria: {
            _id: String,
            nome: String,
            nome_exibe: String
        },
        tipoproduto: {
            _id: String,
            nome: String,
            nome_exibe: String
        },
        marca: {
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

const Model = mongoose.model('Produto', ModelSchema);
module.exports = Model;        