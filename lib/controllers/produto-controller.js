const ProdutoModel = require('../models/produto')

const controller = {
    get: async (req, res) => {
        try {
            let find = {
                "empresa._id": req.usuario.empresa._id
            }
            let lista = await ProdutoModel.find(find)
            res.json({ lista })
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    },
    getOne: async (req, res) => {
        try {
            let produto = await ProdutoModel.findById(req.params.id)
            res.json(produto)
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
            if (body._id) {
                await ProdutoModel.updateOne(
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
            let produto = new ProdutoModel(body)
            await produto.save()
            res.json({})
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
            await ProdutoModel.remove({_id: id})
            res.json({})
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    }
}

module.exports = controller