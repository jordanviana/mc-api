const SubcategoriaModel = require('../models/subcategoria')

const controller = {
    get: async (req, res) => {
        try {
            let find = {
                "empresa._id": req.usuario.empresa._id
            }
            let lista = await SubcategoriaModel.find(find)
            res.json({ lista })
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    },
    getOne: async (req, res) => {
        try {
            let subcategoria = await SubcategoriaModel.findById(req.params.id)
            res.json(subcategoria)
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
            // if (body.nova_categoria) {
            //     let categoria = new CategoriaModel(
            //         {
            //             nome: body.nova_categoria,
            //             destaque: body.nova_categoria_destaque,
            //             empresa: req.usuario.empresa,
            //             usuario: req.usuario
            //         }
            //     )
            //     await categoria.save()
            //     body.categoria = categoria
            // }
            // if (body.categoria) body.categoria = await CategoriaModel.findById(body.categoria)
            if (body._id) {
                await SubcategoriaModel.updateOne(
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
            let subcategoria = new SubcategoriaModel(body)
            await subcategoria.save()
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
            await SubcategoriaModel.remove({ _id: id })
            res.json({})
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    }
}

module.exports = controller