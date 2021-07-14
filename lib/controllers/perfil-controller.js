const Perfil = require('../models/perfil');
const config = require('../config');
const Util = require('../config/util');

const _controller = {
    getOne: async (req, res) => {
        try {
            let id = req.params['id']; 
            let obj = await Perfil.findById(id);
            res.json(obj);
        } catch (error) { 
            console.log(error);
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
            let total = await Perfil.find(find).countDocuments();
            let lista = await Perfil.find(find).skip(init).limit(limit);
            res.json({
                total,
                pagina,
                lista
            });
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' })
        }
    },
    insert: async (req, res) => {
        try {
            let body = req.body || {};
            if (body._id) {
                let _perfil = await Perfil.findById(body._id);
                if (_perfil.nome == config.perfil_master)
                    return res.json(body);
                let perfil = await Perfil.findByIdAndUpdate(body._id, body);
                if (Util.isDev()) console.log(perfil);
                return res.json(perfil);
            }
            delete body._id;
            let perfil = new Perfil(body);
            await perfil.save();
            res.json(perfil);
        } catch (error) {
            console.log(error);
            res.status(405);
            res.json({ msg: 'Ocorreu um erro.' });
        }
    },
}


module.exports = _controller;
