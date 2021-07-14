const config = require("./index");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



export const DB = () => new Promise( (suc, fal) => {
    const conectar = () => {
        console.log(`Conectando...`);
        mongoose.connection.once("open", () => {
            console.log(`Banco conectado!`);
            suc();
        });
    }

    mongoose.connection.on("error", (err) => {
		console.error('Conexão com erro: ', err);
		setTimeout(()=>{
			conectar();
		}, 10000);
    });
    conectar();
})