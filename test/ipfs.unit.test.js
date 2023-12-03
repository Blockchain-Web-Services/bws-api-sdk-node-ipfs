import "dotenv/config.js";
import fs from 'fs';

import { jest } from '@jest/globals';
jest.unstable_mockModule('../src/ipfs-bws_axios-wrapper.mjs', () => {
  return {
    __esModule: true,
    callAxios: jest.fn().mockResolvedValue({
      cid: "cid",
      uris: {
        ipfs: "ipfs://cid",
        url: "https://ipfs.bws.ninja/ipfs/cid"
      }
    })
  };
});

const { BWSIPFS } = await import('../src/_index.mjs');
const bwsipfs = new BWSIPFS({ apikey: process.env.BWS_API_KEY });

const json_object = { timestamp: Date.now() };
const non_json_object = () => "hola";
const json_string = '{ "timestamp": ' + Date.now() + '}';
const non_json_string = "hola!";



const invalid_api_key = new Error('BWS API Key is required. Go www.bws.ninja to get one.');
const invalid_json_error = new Error('invalid json');
const invalid_description = new Error('description must be a string');
const invalid_file_path_parameter = new Error('invalid file path');
const invalid_file_path = new Error('file does not exist');
const invalid_stream = new Error('invalid stream');

const everything_ok = (data) => {
  expect(data).toBeDefined();
  expect(data.cid).toBeDefined();
  expect(data.uris).toBeDefined();
  expect(data.uris.ipfs).toBeDefined();
  expect(data.uris.url).toBeDefined();
}

/* set API key tests */

describe('config setup', () => {
  it('not passing api key', async () => {
    await expect(async () => { new BWSIPFS({}) }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing empty api key', async () => {
    await expect(async () => { new BWSIPFS("") }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing undefined api key', async () => {
    await expect(async () => { new BWSIPFS(undefined) }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing null api key', async () => {
    await expect(async () => { new BWSIPFS(null) }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing wrong type api key', async () => {
    await expect(async () => { new BWSIPFS(123) }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing wrong parameter for api key', async () => {
    await expect(async () => { new BWSIPFS({ thisisnottherightparamter: "hola" }) }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing empty parameter for api key', async () => {
    await expect(async () => { new BWSIPFS({ apikey: "" }) }).rejects.toThrow(invalid_api_key);
    return
  });

  it('passing correct api key as json', async () => {
    const bwsipfs = new BWSIPFS({ apikey: process.env.BWS_API_KEY });
    expect(bwsipfs).toBeDefined();
    return
  });

  it('passing correct api key as string', async () => {
    const bwsipfs = new BWSIPFS(process.env.BWS_API_KEY);
    expect(bwsipfs).toBeDefined();
    return
  });

});

/* upload json tests */

describe('upload json', () => {
  it('upload json object', async () => {
    await bwsipfs.uploadJSONAsync(json_object).then(data => {
      everything_ok(data);
    });
    return
  });

  it('upload json object and description', async () => {
    await bwsipfs.uploadJSONAsync(json_object, "hola mundo!").then(data => {
      everything_ok(data);
    });
    return
  });

  it('upload non-json object', async () => {
    await expect(async () => { await bwsipfs.uploadJSONAsync(non_json_object) }).rejects.toThrow(invalid_json_error);
    return
  });

  it('upload non-string description', async () => {
    await expect(async () => { await bwsipfs.uploadJSONAsync(json_object, {}) }).rejects.toThrow(invalid_description);
    return
  });

  it('upload json string', async () => {
    await bwsipfs.uploadJSONAsync(json_string).then(data => {
      everything_ok(data);
    });
    return
  });

  it('upload non-json string', async () => {
    await expect(async () => { await bwsipfs.uploadJSONAsync(non_json_string) }).rejects.toThrow(invalid_json_error);
    return
  });
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

  it('upload non-existing image', async () => {
    await expect(async () => { await bwsipfs.uploadFileAsync('./files/notexistingfile.png') }).rejects.toThrow(invalid_file_path);
    return
  });

  it('upload using wrong path parameter', async () => {
    await expect(async () => { await bwsipfs.uploadFileAsync({}) }).rejects.toThrow(invalid_file_path_parameter);
    return
  });

  it('upload existing image but wrong description', async () => {
    await expect(async () => {
      await bwsipfs.uploadFileAsync('./files/image.png', {})
    }).rejects.toThrow(invalid_description);
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

  it('upload stream with wrong parameter', async () => {
    await expect(async () => { await bwsipfs.uploadStreamAsync({}) }).rejects.toThrow(invalid_stream);
    return
  });

  it('upload stream with wrong description type', async () => {
    await expect(async () => { await bwsipfs.uploadStreamAsync(fs.createReadStream('./files/image.png'), {}) }).rejects.toThrow(invalid_description);
    return
  });

});
