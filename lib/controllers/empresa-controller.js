const Empresa = require('../models/empresa');
const Usuario = require('../models/usuario');
const Util = require('../config/util');

const _controller = {
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
            let total = await Empresa.find(find).countDocuments();
            let lista = await Empresa.find(find).skip(init).limit(limit);
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
    getOne: async (req, res) => {
        try {
            let empresa = await Empresa.findById(req.params['id']);
            res.json(empresa);
        } catch (error) {
            console.log(error)
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    getEmpresasUsuario: async (req, res) => {
        try {
            let usuario = await Usuario.findById(String(req.usuario._id))
            let lista = []
            if (usuario) {
                lista = usuario.empresas.map(e => {
                    return { _id: e._id, nome: e.nome }
                })
            }
            res.json({ lista });
        } catch (error) {
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    insert: async (req, res) => {
        try {
            let body = req.body || {};
            if (body.isdescarga == '') body.isdescarga = false
            if (body._id) {
                if (Util.isDev()) console.log(body);
                await Empresa.findByIdAndUpdate(body._id, body);
                await Usuario.update({
                    "empresa._id": body._id
                },
                    {
                        $set: { "empresa.nome": body.nome }
                    }
                )
                await Usuario.update({
                    "empresas._id": body._id
                },
                    {
                        $set: { "empresas.$.nome": body.nome }
                    }
                )
                return res.json(body);
            }
            delete body._id;
            let empresa = new Empresa(body);
            await empresa.save();
            res.json(empresa);
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' });
        }
    }
}



module.exports = _controller;