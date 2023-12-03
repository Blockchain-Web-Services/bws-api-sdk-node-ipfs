import "dotenv/config.js";

import { BWSIPFS } from '../../src/_index.mjs';
const bwsipfs = new BWSIPFS({ apikey: process.env.BWS_API_KEY });

const json_object = { timestamp: Date.now() };

console.log("calling BWS.IPFS.Upload with json object:", json_object);
await bwsipfs.uploadJSONAsync(json_object).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});