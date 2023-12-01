import "dotenv/config.js";

import { BWSIPFS } from "../src/_index.mjs";
const bwsipfs_goodAPIKEY = new BWSIPFS({ apikey: process.env.BWS_API_KEY });
const bwsipfs_BADAPIKEY = new BWSIPFS({ apikey: 'not a valid api key' });

describe('upload JSON to IPFS', () => {

  it('add correctly formed json to IPFS', async () => {
    const timestampJson = { "timestamp": Date.now() };
    await bwsipfs_goodAPIKEY.uploadJSONAsync(timestampJson).then(data => {
      expect(data).toBeDefined();
      expect(data.cid).toBeDefined();
      expect(data.uris).toBeDefined();
      expect(data.uris.ipfs).toBeDefined();
      expect(data.uris.url).toBeDefined();
    });
    return;
  })

});