const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const Perfil = require('../models/perfil');
const Util = require('../config/util');
const uuid = require('uuid/v4');
const Auth = require('../config/auth');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    validaUsername: async (req, res) => {
        try {
            let body = req.body || {};
            if (Util.isDev()) console.log(body);
            let usuarios = await Usuario.find(body).countDocuments();
            res.json({ usuarios });
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    config: async (req, res) => {
        try {
            let empresas = await Empresa.find();
            let perfis = await Perfil.find();
            res.json({ empresas, perfis });
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    configLimitada: async (req, res) => {
        try {
            let empresas = req.usuario.empresa
            let perfis = await Perfil.find({ nome: { $ne: "Adm Geral" } });
            res.json({ empresas, perfis });
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    alteraEmpresa: async (req, res) => {
        try {
            let index = Number(req.params['index']) || 0;
            let usuario = await Usuario.findById(req.usuario._id);
            if (usuario.empresas.length - 1 < index) index = 0;
            usuario.empresa = usuario.empresas[index];
            await usuario.save();
            let retorno = await Auth.geraSessao(usuario);
            res.json(retorno);
        } catch (error) {
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    getOne: async (req, res) => {
        try {
            let usuario = await Usuario.findById(req.params.id);
            res.json(usuario);
        } catch (error) {
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    lista: async (req, res) => {
        let pagina = Number(req.params['pagina?']) || 0;
        let porpagina = Number(req.params['porpagina?']) || 10;
        let busca = req.params['busca?'];
        let init = pagina * porpagina;
        let limit = init + porpagina;
        let find = {};
        if (busca) {
            find.nome = { $regex: busca, $options: 'i' };
        }
        try {
            let total = await Usuario.find(find).countDocuments();
            let lista = await Usuario.find(find).skip(init).limit(limit);
            res.json({
                total,
                pagina,
                lista
            });
        } catch (error) {
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    insert: async (req, res) => {
        try {
            let body = req.body || {};
            if (body._id) {
                if (body.senha) body.senha = bcrypt.hashSync(body.senha);
                if (Util.isDev()) console.log(body);
                await Usuario.findByIdAndUpdate(body._id, body);
                delete body.senha;
                delete body.senha2;
                return res.json(body);
            }
            delete body._id;
            body.senha = bcrypt.hashSync(body.senha);
            let usuario = new Usuario(body);
            await usuario.save();
                        

            res.json(usuario);
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' });
        }
    },
    updateSenha: async (req, res) => {
        try {
            let body = req.body || {};
            console.log(body)
            let usuario = await Usuario.findById(body._id).select("senha")
            console.log(usuario)
            if (!bcrypt.compareSync(body.senhaAtual, usuario.senha)) {
                throw ("Senha errada");
            }
            let novaSenha = bcrypt.hashSync(body.senha)
            let resp = await Usuario.updateOne({ _id: usuario._id }, { $set: { senha: novaSenha } })
            res.json({ q: true })
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' });
        }
    },
    insertEmpresa: async (req, res) => {
        try {
            let body = req.body || {};
            if (body._id) {
                if (body.senha) body.senha = bcrypt.hashSync(body.senha);
                if (Util.isDev()) console.log(body);
                await Usuario.findByIdAndUpdate(body._id, body);
                delete body.senha;
                delete body.senha2;
                return res.json(body);
            }
            delete body._id;
            body.senha = bcrypt.hashSync(body.senha);
            let usuario = new Usuario(body);
            await usuario.save();
            res.json(usuario);
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' });

        }
    }
}