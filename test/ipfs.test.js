import "dotenv/config.js";

import { BWSIPFS } from "../src/_index.mjs";
const bwsipfs = new BWSIPFS({ username: process.env.IPFS_API_NODE_USERNAME, password: process.env.IPFS_API_NODE_PASSWORD, IPFFAPIUrl: process.env.IPFS_API_NODE_URL });


describe('upload JSON to IPFS', () => {

  it('add correctly formed json to IPFS', async () => {
    const Json = { "value": "Hola Mundo!" };
    await bwsipfs.uploadJSONAsync(Json).then(data => {
      expect(data).toBeDefined();
      expect(data).toHaveLength(("QmPUTWRNGdYQyCbQCb1AzqKGF1vVUkP3D1mgGNuCB79dhS").length);
    });
    return;
  })

});

describe('upload URL to IPFS', () => {

  it('add existing URL to IPFS', async () => {
    await bwsipfs.uploadURLAsync("https://ipfs.bws.ninja/ipfs/QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T").then(data => {
      expect(data).toBeDefined();
      expect(data).toHaveLength(("QmPUTWRNGdYQyCbQCb1AzqKGF1vVUkP3D1mgGNuCB79dhS").length);
    });
    return;
  })

});

