const MarcaModel = require('../models/marca')
const CategoriaModel = require('../models/categoria')

const controller = {
    get: async (req, res) => {
        try {
            let find = {
                "empresa._id": req.usuario.empresa._id
            }
            let lista = await MarcaModel.find(find)
            res.json({ lista })
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    },
    getOne: async (req, res) => {
        try {
            let marca = await MarcaModel.findById(req.params.id)
            res.json(marca)
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    },
    insert: async (req, res) => {
        try {
            let body = req.body
            body.usuario = req.usuario
            body.empresa = req.usuario.empresa
            if (body.nova_categoria) {
                let categoria = new CategoriaModel(
                    {
                        nome: body.nova_categoria,
                        nome_exibe: body.nova_categoria_nome_exibe,
                        destaque: body.nova_categoria_destaque,
                        empresa: req.usuario.empresa,
                        usuario: req.usuario
                    }
                )
                await categoria.save()
                body.categoria = categoria._id
            }
            if (body.categoria) body.categoria = await CategoriaModel.findById(body.categoria)
            if (body._id) {
                await MarcaModel.updateOne(
                    {
                        _id: String(body._id),
                        "empresa._id": req.usuario.empresa._id
                    },
                    {
                        $set: body
                    }
                )
                res.json({})
            }
            let marca = new MarcaModel(body)
            await marca.save()
            res.json(marca)
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id
            if (!id) throw "Falta id"
            await MarcaModel.remove({_id: id})
            res.json({})
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    }
}

module.exports = controller