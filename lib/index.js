require("dotenv").config();
global.log = obj => {
    console.log(JSON.stringify(obj, null, 2))
}
require('./config/server');
