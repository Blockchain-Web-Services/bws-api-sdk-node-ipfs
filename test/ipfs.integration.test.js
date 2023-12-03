import "dotenv/config.js";
import fs from 'fs';

const { BWSIPFS } = await import('../src/_index.mjs');
const bwsipfs = new BWSIPFS({ apikey: process.env.BWS_API_KEY });

const json_object = { timestamp: Date.now() };


const invalid_api_key = new Error('Request failed with status code 403');
const invalid_content = new Error('invalid content type, only json, pdf and images are supported (png, jpg, jpeg, gif, bmp, tiff)');


const everything_ok = (data) => {
  expect(data).toBeDefined();
  expect(data.cid).toBeDefined();
  expect(data.uris).toBeDefined();
  expect(data.uris.ipfs).toBeDefined();
  expect(data.uris.url).toBeDefined();
}

/* set API key tests */

describe('config setup', () => {
  it('invalid api key', async () => {

    const ipfs = new BWSIPFS("not a valid api key");
    expect(bwsipfs).toBeDefined();

    await expect(async () => { await ipfs.uploadJSONAsync(json_object) }).rejects.toThrow(invalid_api_key);

    return
  }, 50000);

});

/* upload json tests */

describe('upload json', () => {
  it('upload json object', async () => {
    await bwsipfs.uploadJSONAsync(json_object).then(data => {
      everything_ok(data);
    });
    return
  }, 10000);

  it('upload json object and description', async () => {
    await bwsipfs.uploadJSONAsync(json_object, "hola mundo!").then(data => {
      everything_ok(data);
    });
    return
  }, 10000);

});

/* upload file tests */

describe('upload using image path', () => {
  it('upload image without description', async () => {
    await bwsipfs.uploadFileAsync('./files/image.png').then(data => {
      everything_ok(data);
    });
    return
  });

  it('upload image with description', async () => {
    await bwsipfs.uploadFileAsync('./files/image.png', "hola!").then(data => {
      everything_ok(data);
    });
    return
  });

  it('upload invalid image type', async () => {
    await expect(async () => { await bwsipfs.uploadFileAsync('./files/image.svg') }).rejects.toThrow(invalid_content);
    return
  });

});

/* upload stream tests */

describe('upload using stream', () => {
  it('upload stream with no description', async () => {
    await bwsipfs.uploadStreamAsync(fs.createReadStream('./files/image.png')).then(data => {
      everything_ok(data);
    });
    return
  });

  it('upload stream with description', async () => {
    await bwsipfs.uploadStreamAsync(fs.createReadStream('./files/image.png'), "hola!").then(data => {
      everything_ok(data);
    });
    return
  });

});
