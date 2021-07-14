const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const TokenSchema = new mongoose.Schema(
  {
    usuario: { type : String , index: true },
    token: String,
    status: {type: Boolean, default: true},
    browser: String
  }
);

TokenSchema.plugin(timestamps);
TokenSchema.plugin(mongooseStringQuery);
TokenSchema.index({token: 1, status: 1});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;