import "dotenv/config.js";

import { BWSIPFS } from '../../src/_index.mjs';
const bwsipfs = new BWSIPFS({ apikey: process.env.BWS_API_KEY });

console.log("sending './files/image.png' to IPFS...");
await bwsipfs.uploadFileAsync('./files/image.png').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});