const Util = require("./util");
const MONGODB_URI = "mongodb+srv://preiviana:w46TNVMVxvRC0XYg@cluster0.opzph.mongodb.net/multicommerce?retryWrites=true&w=majority";

module.exports = {
    secret: 'preiviana_2021',
	name: 'multicommerce-api',
	version: '1.0.0',
	perfil_master: "Adm Geral",
	env: process.env.NODE_ENV || 'development',
	port: Util.isDev() ? 3003 : process.env.PORT || 8080,
	db: {
		uri: MONGODB_URI,
		// uri: Util.isDev() ? 'mongodb://127.0.0.1:27017/multicommerce' : MONGODB_URI
	}
};


 