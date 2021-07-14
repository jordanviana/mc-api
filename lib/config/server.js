import { TryCatchApi } from "../comuns/try-catch";

const config = require("./index");
const Util = require("./util");
const init = require("./init");
const restify = require("restify");
const mongoose = require("mongoose");
const restifyPlugins = require("restify-plugins");

/**
 * Initialize Server
 */
export const server = restify.createServer({
    name: config.name,
    version: config.version,
});

/**
 * Middleware
 */

server.use((req, res, next) => {
    let extra = req.getRoute();
    console.warn(`${extra.method}: ${req.href()}`);
    try {
        next();
    } catch (error) {
        console.log(error);
        res.end();
    }
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === "options") {
        console.log("received an options method request");
        var allowHeaders = [
            "Accept",
            "Accept-Version",
            "Content-Type",
            "Content-Length",
            "Server",
            "Date",
            "Api-Version",
            "Origin",
            "X-Requested-With",
            "Authorization",
            "token",
            "empresa",
            "matriz",
        ]; // added Origin & X-Requested-With & **Authorization**
        if (res.methods.indexOf("OPTIONS") === -1) res.methods.push("OPTIONS");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", allowHeaders.join(", "));
        res.header("Access-Control-Allow-Methods", res.methods.join(", "));
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        return res.send(200);
    } else return res.send(400);
}

server.on("MethodNotAllowed", unknownMethodHandler);

/**
 * Start Server, Connect to DB & Require Routes
 */


server.listen(config.port, () => {
    // establish connection to mongodb
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    const db = mongoose.connection;

    let conectar = () => {
        console.log(`Tentando conectar...`);
        db.once("open", () => {
			require("../routes")(server);
            // SiteRouter(newServer);
            console.log(`Conectado na porta ${config.port}`);
        });
    };

    db.on("error", (err) => {
        console.error("Conexão com erro: ", err);
        // process.exit(1);
        setTimeout(() => {
            conectar();
        }, 10000);
    });

    conectar();
    init();
});


export const newServer = {
    preparaArguments() {
        let rota = arguments[0];
        let newsMid = [];
        for (let i in arguments) {
            if (i != "0") {
                newsMid.push(TryCatchApi(arguments[i]));
            }
        }
        return {
            rota,
            arguments: newsMid,
        };
    },
    post() {
        let _resp = newServer.preparaArguments(...arguments);
        server.post(_resp.rota, ..._resp.arguments);
    },
    get() {
        let _resp = newServer.preparaArguments(...arguments);
        server.get(_resp.rota, ..._resp.arguments);
    },
};
