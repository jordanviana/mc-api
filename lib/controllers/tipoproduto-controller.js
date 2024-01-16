const TipoprodutoModel = require('../models/tipoproduto')
const CategoriaModel = require('../models/categoria')
const SubcategoriaModel = require('../models/subcategoria')

const controller = {
    get: async (req, res) => {
        try {
            let find = {
                "empresa._id": req.usuario.empresa._id
            }
            let lista = await TipoprodutoModel.find(find)
            res.json({ lista })
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    },
    getOne: async (req, res) => {
        try {
            let tipoproduto = await TipoprodutoModel.findById(req.params.id)
            res.json(tipoproduto)
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
            if (body.nova_subcategoria) {
                let subcategoria = new SubcategoriaModel(
                    {
                        nome: body.nova_subcategoria,
                        nome_exibe: body.nova_subcategoria_nome_exibe,
                        destaque: body.nova_subcategoria_destaque,
                        empresa: req.usuario.empresa,
                        usuario: req.usuario,
                        categoria: body.categoria
                    }
                )
                await subcategoria.save()
                body.subcategoria = subcategoria._id
            }
            if (body.subcategoria) body.subcategoria = await SubcategoriaModel.findById(body.subcategoria)
            if (body._id) {
                await TipoprodutoModel.updateOne(
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
            let tipoproduto = new TipoprodutoModel(body)
            await tipoproduto.save()
            res.json(tipoproduto)
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
            await TipoprodutoModel.remove({_id: id})
            res.json({})
        } catch (error) {
            console.log(error)
            res.status(405)
            res.json({ msg: typeof error == 'string' ? error : 'Ocorreu um erro.' });
        }
    }
}

module.exports = controller