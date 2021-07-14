
const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const Perfil = require('../models/perfil');
const bcrypt = require('bcrypt-nodejs');
const config = require('./index');


module.exports = async () => {
    try {
        let body = {cod: 0, nome: 'Teste'};
        let empresa = await Empresa.findOne(body);
        if(!empresa){
            let empresa = new Empresa(body);
            let perfil = new Perfil({
                nome: config.perfil_master
            });
            await empresa.save();
            await perfil.save();
            empresa.perfil = perfil.nome;
            let _empresa = {
                _id: empresa._id,
                nome: empresa.nome,
                perfil: perfil
            } 
            let usuario = new Usuario({
                nome: 'Adm Geral',
                username: 'admin',
                senha: bcrypt.hashSync("1234"),
                empresa: _empresa,
                empresas: [_empresa],
                ativo: true
            }) 
            await usuario.save();
        }
      
    } catch (error) {
        console.log(error)
        console.log("ERRO NO INIT")
    }
}
