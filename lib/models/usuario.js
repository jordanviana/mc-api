const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const UsuarioSchema = new mongoose.Schema(
  {
    nome: String,
    username: {
      type: String,
      index: true,
      unique: true
    },
    senha: {
      type: String,
      select: false
    },
    empresa: {
      _id: String,
      nome: String,
      perfil: {
        _id: String,
        nome: String
      }
    },
    empresas: [
      {
        _id: String,
        nome: String,
        perfil: {
          _id: String,
          nome: String
        }
      }
    ],
    ativo: Boolean,
    celular: String
  },
);

UsuarioSchema.plugin(timestamps);
UsuarioSchema.plugin(mongooseStringQuery);

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;