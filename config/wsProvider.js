require("dotenv").config();
const Web3 = require("web3");
const wsOptions = require("../src/utils/wsOptions");
const WS_ENDPOINT = process.env.WS_ENDPOINT;
const provider = new Web3.providers.WebsocketProvider(WS_ENDPOINT, wsOptions);
const web3 = new Web3(provider);

module.exports = { provider, web3 };
