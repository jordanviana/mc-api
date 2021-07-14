const UsuarioController = require('../controllers/usuario-controller');
const PerfilController = require('../controllers/perfil-controller');
const EmpresaController = require('../controllers/empresa-controller');
const CategoriaController = require('../controllers/categoria-controller');
const SubcategoriaController = require('../controllers/subcategoria-controller');
const TipoprodutoController = require('../controllers/tipoproduto-controller');
const Auth = require('../config/auth');


module.exports = function (server) {
  
  server.post('/login', Auth.autentica);
  server.post('/v2/login', Auth.authV2);


  //PERFIL
  server.get('/perfis/:id', Auth.autoriza([7, 14]), PerfilController.getOne);
  server.get('/perfis/:pagina?/:porpagina?/:busca?', Auth.autoriza([7, 14]), PerfilController.lista);
  server.post('/perfis/novo', Auth.autoriza(8), PerfilController.insert);
  //USUARIOS
  server.get('/usuario/:pagina?/:porpagina?/:busca?', Auth.autoriza(13), UsuarioController.lista);
  server.get('/usuario/config', Auth.autoriza([17, 173]), UsuarioController.config);
  server.get('/usuario/configlimitada', Auth.autoriza(43), UsuarioController.configLimitada);
  server.get('/usuario/alterarempresa/:index', Auth.autoriza([15]), UsuarioController.alteraEmpresa);
  server.post('/usuario/validausername', Auth.autoriza([14, 43, 237]), UsuarioController.validaUsername);
  server.post('/usuario/novo', Auth.autoriza([14, 173, 237]), UsuarioController.insert);
  server.post('/usuario/updatesenha', Auth.autoriza(15), UsuarioController.updateSenha);
  server.post('/usuario/novoEmpresa', Auth.autoriza(43), UsuarioController.insertEmpresa);
  server.get('/usuario/:id', Auth.autoriza([14, 173]), UsuarioController.getOne);
  //EMPRESA
  server.get('/empresa/:id', Auth.autoriza([10, 14, 39, 165]), EmpresaController.getOne);
  server.get('/empresa/empresas_usuario', Auth.autoriza([230]), EmpresaController.getEmpresasUsuario);
  server.get('/empresa/:pagina?/:porpagina?/:busca?', Auth.autoriza([10, 14, 149]), EmpresaController.lista);
  server.post('/empresa/nova', Auth.autoriza(11), EmpresaController.insert);

  //CATEGORIA
  server.get('/categoria/:id', Auth.autoriza([11]), CategoriaController.getOne);
  server.get('/categoria/:pagina?/:porpagina?/:busca?', Auth.autoriza([11]), CategoriaController.get);
  server.post('/categoria/novo', Auth.autoriza([11]), CategoriaController.insert);
  server.get('/categoria/delete/:id', Auth.autoriza([11]), CategoriaController.delete);
  //SUBCATEGORIA
  server.get('/subcategoria/:id', Auth.autoriza([12]), SubcategoriaController.getOne);
  server.get('/subcategoria/:pagina?/:porpagina?/:busca?', Auth.autoriza([12]), SubcategoriaController.get);
  server.post('/subcategoria/novo', Auth.autoriza([12]), SubcategoriaController.insert);
  server.get('/subcategoria/delete/:id', Auth.autoriza([12]), SubcategoriaController.delete);
  //TIPOPRODUTO
  server.get('/tipoproduto/:id', Auth.autoriza([13]), TipoprodutoController.getOne);
  server.get('/tipoproduto/:pagina?/:porpagina?/:busca?', Auth.autoriza([13]), TipoprodutoController.get);
  server.post('/tipoproduto/novo', Auth.autoriza([13]), TipoprodutoController.insert);
  server.get('/tipoproduto/delete/:id', Auth.autoriza([13]), TipoprodutoController.delete);

};


