const LogModel = require('../models/log')
const nodemailer = require('nodemailer');
// const { accountSid, authToken } = require('./keys');
// const client = require('twilio')(accountSid, authToken);
const Log = LogModel;



const Util = {
    isoStringToDataBr: isostring => {
        try {
            if (typeof isostring != 'string')
                isostring = isostring.toISOString();
            return isostring.split("T")[0].split("-").reverse().join("/")
        } catch (error) {
            console.log(error)
        }
    },
    isoStringToDataHoraBr: isostring => {
        try {
            if (typeof isostring != 'string')
                isostring = isostring.toISOString();
            return `${isostring.split("T")[0].split("-").reverse().join("/")} ${isostring.split("T")[1].substr(0,5)}`
        } catch (error) {
            console.log(error)
        }
    },
    splitArray: (base, maximo) => {
        try {
            let resultado = [[]];
            let grupo = 0;
            for (let indice = 0; indice < base.length; indice++) {
                if (resultado[grupo] === undefined) {
                    resultado[grupo] = [];
                }

                resultado[grupo].push(base[indice]);

                if ((indice + 1) % maximo === 0) {
                    grupo = grupo + 1;
                }
            }

            return resultado;
        } catch (error) {
            console.log(error)
        }
    },
    dateUsToBr: isostring => {
        try {
            return isostring.split("-").reverse().join("/")
        } catch (error) {
            console.log(error)
        }
    },
    setLog: async (sobre, user, id_alvo, user_agent = "", conteudo = "", data = "") => {
        try {
            let log = new Log({
                log: sobre,
                user: user,
                id_alvo: id_alvo,
                user_agent: user_agent,
                data,
                conteudo: typeof conteudo == "string" ? conteudo : JSON.stringify(conteudo)
            })
            console.log(log)
            await log.save()
        } catch (error) {
            console.log(error)
        }
    },
    floatToMoney: (text) => {
        if (!text)
            return '0,00';
        let money = Util.moneyBr(Number(text).toFixed(2).split('.').join(''));
        if (Number(text) < 0) return `-${money}`
        return money;
    },
    isDev: () => {
        var env = process.argv[2] || 'dev';
        switch (env) {
            case 'dev':
                return true;
                break;
            case 'prod':
                return false;
                break;
        }
    },
    breakString: (string, size = 32) => {
        let breakStr = [];

        while (string.length > 0) {
            breakStr.push(string.substring(0, size));
            string = string.substring(size, string.length);
        }
        return breakStr;
    },
    moneyBr: text => {
        if (!text)
            return '';
        let money = String(Number(Util.somenteNumero(text)));
        if (Number(money) > 9999999999999)
            money = "0";
        if (money.length < 3)
            money = Util.zeroEsquerda(3, money);
        money = money.replace(/([0-9]{2})$/g, ",$1");
        if (money.length > 6)
            money = money.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        return money;
    },
    zeroEsquerda: (zeros, text) => {
        text = text + '';
        let resp = '';
        let size = zeros - text.length;
        for (let i = 0; i < size; i++) {
            resp += '0';
        }
        resp += text;
        return resp;
    },
    somenteNumero(text) {
        if (!text)
            return '';
        let numeros = [];
        '0123456789'.split('')
            .map(value => numeros[value] = true);
        return String(text).split('')
            .filter(
                value => numeros[value]
            ).join('');
    },
    diasSemana: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    formatAMPM: (date = new Date()) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    geraCaracter: (char = '', size = 0) => {
        let retorno = '';
        for (let i = 0; i < size; i++) {
            retorno += char;
        }
        return retorno;
    },
    testWhite(x) {
        var white = new RegExp(/^\s$/);
        return white.test(x.charAt(0));
    },
    moneyBrToUs: text => {
        return Number(Number((text || "0").split('.').join('').split(',').join('.')).toFixed(2));
    },
    str_split: (string, splitLength) => {
        if (splitLength === null) {
            splitLength = 1
        }
        if (string === null || splitLength < 1) {
            return false
        }

        string += ''
        var chunks = []
        var pos = 0
        var len = string.length

        while (pos < len) {
            chunks.push(string.slice(pos, pos += splitLength))
        }

        return chunks
    },
    ignoraAcentosRegex: (string = '') => {
        string = string.toLowerCase()
        return string.replace(/a/g, '[a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,ê]')
            .replace(/i/g, '[i,í,ï,î]')
            .replace(/o/g, '[o,ó,ö,ò,ô]')
            .replace(/u/g, '[u,ü,ú,ù,û]');
    },
    contador: function () {
        let data = null;
        let _msg = null
        this.init = function (funcao) {
            data = new Date();
            _msg = funcao;
            if (Util.isDev()) console.log(`Inicio de ${funcao}...`);
        }
        this.show = function () {
            let dta = new Date();
            let saldo = dta.getTime() - data.getTime();
            if (Util.isDev()) console.log(`${_msg} levou ${saldo / 1000}s.`);
        }
    },
    logError: (error) => {
        return {
            msg: error.toString(),
            response: error.response
        }
    },
    sendEmail: (assunto, mensagem) => {
        let email = "jordanviiana@gmail.com";
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: '77761111200'
            }
        });
        const mailOptions = {
            from: email, // sender address
            to: email, // list of receivers
            subject: assunto, // Subject line
            html: `<h1>${assunto}</h1><br><pre><code>${mensagem}</code></pre>`
        }
        transporter.sendMail(mailOptions, function (err, info) {
            // if (err)
            //     console.log(err);
            // else
            //     console.log(info);
        });
    },
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    enviaSms: async (celular, texto) => {
        try {
            let data = client.messages
                .create({
                    body: texto,
                    from: '+15852944609',
                    to: celular,
                })
            return data;
        } catch (error) {
            console.error(error)
            throw error;
        }
    },
    meses: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ],
    getFindData: (data, fuso, so_inicio = false) => {
        let data_inicio = new Date(data)
        data_inicio.setHours(data_inicio.getHours() + (fuso * -1))
        let data_fim = new Date(data)
        data_fim.setHours(data_fim.getHours() + (fuso * -1))
        data_fim.setDate(data_fim.getDate() + 1)
        let retorno = {
            $gte: data_inicio,
            $lt: data_fim
        }
        if (so_inicio){
            retorno = {
                $gte: data_inicio
            }
        }
        return retorno
    }

}

module.exports = Util;
