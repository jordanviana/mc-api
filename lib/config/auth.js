const config = require("./index");
const Util = require("./util");
const permissoes = require("./permissoes");
const Usuario = require("../models/usuario");
const Empresa = require("../models/empresa");
const Perfil = require("../models/perfil");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");


let decode = async (token) => {
    try {
        var decoded = jwt.verify(token, config.secret);
        let user = await Usuario.findById(decoded.admin);
        return user;
    } catch (err) {
        throw "Token invalido.";
    }
};
let decodeCliente = async (token) => {
    try {
        var decoded = jwt.verify(token, config.secret);
        let cliente = await Cliente.findOne({
            _id: decoded.admin,
            ativo: true,
        });
        return cliente;
    } catch (err) {
        console.log(err);
        throw "Token invalido.";
    }
};

module.exports = {
    autoriza: (rota) => {
        return async (req, res, next) => {
            try {
                let token = req.headers["token"];
                let idempresa = req.headers["empresa"];
                let user = await decode(token);
                let usuario = await Usuario.findOne({
                    _id: user._id,
                    "empresas._id": idempresa,
                    ativo: true
                });
                if (!usuario) throw "Usuário não encontrado";
                usuario._id = String(usuario._id)
                req.usuario = usuario;
                let empresa = usuario.empresas.filter(
                    (v) => v._id == idempresa
                )[0];
                if (!empresa) throw "Empresa não encontrada";
                empresa._id = String(empresa._id)
                req.empresa = await Empresa.findById(empresa._id).select(
                    "nome descricao cod ativo"
                );
                req.usuario.empresa = empresa;
                if (empresa.perfil.nome == config.perfil_master) {
                    next();
                    return 1;
                }
                let perfil = await Perfil.findById(empresa.perfil._id);
                if (Array.isArray(rota)) {
                    for (let i of perfil.permissoes) {
                        for (let _rota of rota) {
                            if (_rota == i) {
                                next();
                                return 1;
                            }
                        }
                    }
                } else {
                    for (let i of perfil.permissoes) {
                        if (rota == i) {
                            next();
                            return 1;
                        }
                    }
                }
                throw "Permissão não encontrada";
            } catch (error) {
                console.log(error);
                res.status(403);
                res.json({ msg: "Não autorizado" });
                return 0;
            }
        };
    },
    autorizaSite: () => {
        return async (req, res, next) => {
            try {
                let token = req.headers["token"];
                let cliente = await decodeCliente(token);
                if (!cliente) throw "Cliente não encontrado";
                req.cliente = cliente;
                next();
            } catch (error) {
                console.log(error);
                res.status(403);
                res.json({ msg: "Não autorizado" });
                return 0;
            }
        };
    },
    geraSessao: async (user) => {
        try {
            const payload = {
                admin: user._id,
            };

            let expiresIn = {};
            if (!user.duas_etapas) expiresIn["expiresIn"] = 86400;
            var token = jwt.sign(payload, config.secret, expiresIn);

            let perm = {};
            if (user.empresa.perfil.nome == config.perfil_master) {
                perm = permissoes;
            } else {
                let perfil = await Perfil.findById(user.empresa.perfil._id);
                perfil.permissoes.map((v) => {
                    perm[v] = permissoes[v];
                });
            }
            let empresaLogada = await Empresa.findById(user.empresa._id)
            let expira = new Date();

            if (!user.duas_etapas) expira.setHours(expira.getHours() + 24);
            else expira.setMonth(expira.getMonth() + 24);

            return {
                success: true,
                expira,
                usuario: {
                    _id: user._id,
                    nome: user.nome,
                    email: user.email,
                    empresa: {
                        ...empresaLogada.toObject(),
                        ...user.empresa,
                        permissoes: perm,
                    },
                    empresas: user.empresas,
                },
                token: token,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    geraSessaoCliente: async (cliente) => {
        try {
            const payload = {
                admin: cliente._id,
            };

            var token = jwt.sign(payload, config.secret, {
                expiresIn: 86400, // expires in 24 hours
            });
            return {
                token: token,
                nome: cliente.nome,
                username: cliente.username,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    autentica: async (req, res) => {
        let msg = "Falha ao autenticar.";
        try {
            let { username, senha } = req.body;
            let user = await Usuario.findOne({ username, ativo: true }).select(
                "nome username empresas empresa senha ativo"
            );
            if (!user) throw "Usuario não encontrado";
            if (!bcrypt.compareSync(senha, user.senha)) {
                throw "Senha errada";
            }

            let returno = await module.exports.geraSessao(user);
            res.json(returno);
        } catch (error) {
            console.log(error);
            res.status(403);
            res.json({ msg });
            return true;
        }
    },
    authV2: async (req, res) => {
        let msg = "Falha ao autenticar.";
        try {
            let { username, senha } = req.body;
            console.log(req.body)
            let user = await Usuario.findOne({ username, ativo: true })
            if (!user) throw "Usuario não encontrado";
            // if (!bcrypt.compareSync(senha, user.senha)) throw "Senha errada";
            let retorno = await module.exports.geraSessao(user);
            res.json(retorno);
        } catch (error) {
            console.log(error);
            res.status(403);
            res.json({ msg });
            return true;
        }
    }
};