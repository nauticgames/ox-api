import Web3 from "web3";
import WSOptions from "../helpers/WSOptions";
import server from "./server";

const WSProvider = new Web3.providers.WebsocketProvider(
  server.web3.endpoints.ws,
  WSOptions
);

const HTTPSProvider = new Web3.providers.HttpProvider(
  server.web3.endpoints.https
);

const wsInstance = new Web3(WSProvider);
const httpsInstance = new Web3(HTTPSProvider);

export { wsInstance, httpsInstance };
