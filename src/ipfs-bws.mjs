import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Readable } = require('stream')
import axios from 'axios';

const FormData = require('form-data');

/**
 * ? Upload content to IPFS server and return ipfs hash
 * @param {nftJson} json json object to save into IPFS
 * @returns IPFS Hash
 */
// ! private function
async function uploadToIPFSAsync(config, content, pin = true, contentType = "application/json") {

  const extension = contentType?.split("/")[1] ?? "file";

  if (!content)
    throw new Error("Error uploading to IPFS, no content provided");

  // Create form data
  const formData = new FormData();
  formData.append('file', content, {
    filename: `data.${extension}`,
    contentType: contentType,
  });

  // Encode Basic Auth credentials
  const base64Credentials = Buffer.from(`${config.username}:${config.password}`).toString('base64');
  const authHeader = `Basic ${base64Credentials}`;

  // Set up the HTTP headers with Basic Auth
  const headers = {
    ...formData.getHeaders(),
    'Authorization': authHeader,
    maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large files
    maxBodyLength: Infinity
  };

  let ipfsHash = null;
  // Make the HTTP request to the IPFS API to add and pin the file
  await axios.post(`${config.IPFFAPIUrl}/add?pin=${pin}`, formData, { headers }).then((response) => {
    if (response.data.cid)
      ipfsHash = response.data.cid;
    else
      throw new Error("Error uploading to IPFS, no cid returned");
  }).catch((error) => {
    throw new Error("Error uploading to IPFS: " + error);
  });
  return ipfsHash;
}


/**
 * ? Uplaod json into IPFS server and return ipfs hash.
 * @param {config} object bws.ninja IPFS config
 * @param {json} json json object to save into IPFS
 * @param {pin} boolean pin file in IPFS?
 * @returns IPFS Hash
 */
async function uploadJSONToIPFSAsync(config, json, pin = true) {

  if (!json)
    throw new Error("Error uploading to IPFS, no JSON provided");

  const jsonString = JSON.stringify(json);
  return await uploadToIPFSAsync(config, jsonString, pin, "application/json");
}

/**
 * ? Upload json into IPFS server and return ipfs hash.
 * @param {config} object bws.ninja IPFS config
 * @param {stream} stream to save into IPFS
 * @param {pin} boolean pin file in IPFS?
 * @param {contentType} string content type of stream
 * @returns IPFS Hash
 */
async function uploadStreamToIPFSAsync(config, stream, pin = true, contentType = "application/octet-stream") {
  if (!stream)
    throw new Error("Error uploading to IPFS, no stream provided");
  return await uploadToIPFSAsync(config, stream, pin, contentType);
}


/**
 * ? Downloads an URL content and sends it to IPFS
 * @param {config} object bws.ninja IPFS config
 * @param {URL} URL to save into IPFS
 * @param {pin} boolean pin file in IPFS?
 * @param {contentType} string content type of stream
 * @returns IPFS Hash
 */
async function uploadURLToIPFSAsync(config, url, pin = true, contentType = "application/octet-stream") {

  var stream = new Readable();
  try {

    let response = await axios.get(encodeURI(url), {
      responseType: 'arraybuffer',
    })

    var buffer = Buffer.from(response.data, 'binary');
    stream.push(buffer);
    stream.push(null);

  } catch (error) {
    throw new Error("Error downloading URL" + error);
  }
  return await uploadStreamToIPFSAsync(config, stream, pin, contentType);

}

export { uploadJSONToIPFSAsync, uploadStreamToIPFSAsync, uploadURLToIPFSAsync };



