import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Readable } = require('stream')
import axios from 'axios';

const FormData = require('form-data');


/**
 * ? Upload content to IPFS server and return ipfs hash
 * @param {username} string bws.ninja IPFS username
 * @param {password} string bws.ninja IPFS password
 * @param {ipfsAPIUrl} string bws.ninja IPFS API url
 * @param {nftJson} json json object to save into IPFS
 * @returns IPFS Hash
 */
// ! private function
async function uploadToIPFSAsync(username, password, ipfsAPIUrl, pin = true, content, contentType = "application/json") {

  const extension = contentType?.split("/")[1] ?? "file";

  // Create form data
  const formData = new FormData();
  formData.append('file', content, {
    filename: `data.${extension}`,
    contentType: contentType,
  });

  // Encode Basic Auth credentials
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
  const authHeader = `Basic ${base64Credentials}`;

  // Set up the HTTP headers with Basic Auth
  const headers = {
    ...formData.getHeaders(),
    'Authorization': authHeader,
  };

  let ipfsHash = null;
  // Make the HTTP request to the IPFS API to add and pin the file
  await axios.post(`${ipfsAPIUrl}/add?pin=${pin}`, formData, { headers }).then((response) => {
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
 * @param {username} string bws.ninja IPFS username
 * @param {password} string bws.ninja IPFS password
 * @param {ipfsAPIUrl} string bws.ninja IPFS API url
 * @param {json} json json object to save into IPFS
 * @param {pin} boolean pin file in IPFS?
 * @returns IPFS Hash
 */
async function uploadJSONToIPFSAsync(username, password, ipfsAPIUrl, json, pin = true) {
  const jsonString = JSON.stringify(json);
  return await uploadToIPFSAsync(username, password, ipfsAPIUrl, pin, jsonString, "application/json");
}

/**
 * ? Uplaod json into IPFS server and return ipfs hash.
 * @param {username} string bws.ninja IPFS username
 * @param {password} string bws.ninja IPFS password
 * @param {ipfsAPIUrl} string bws.ninja IPFS API url
 * @param {stream} stream to save into IPFS
 * @param {pin} boolean pin file in IPFS?
 * @param {contentType} string content type of stream
 * @returns IPFS Hash
 */
async function uploadStreamToIPFSAsync(username, password, ipfsAPIUrl, pin = true, stream, contentType = "application/octet-stream") {
  return await uploadToIPFSAsync(username, password, ipfsAPIUrl, pin, stream, contentType);
}


/**
 * ? Downloads an URL content and sends it to IPFS
 * @param {username} string bws.ninja IPFS username
 * @param {password} string bws.ninja IPFS password
 * @param {ipfsAPIUrl} string bws.ninja IPFS API url
 * @param {URL} URL to save into IPFS
 * @param {pin} boolean pin file in IPFS?
 * @param {contentType} string content type of stream
 * @returns IPFS Hash
 */
async function uploadURLToIPFSAsync(username, password, ipfsAPIUrl, url, pin = true, contentType = "application/octet-stream") {

  var stream = new Readable();
  try {
    let response = await axios.get(encodeURI(url), {
      responseType: 'arraybuffer',
    })

    var buffer = Buffer.from(response.data, 'binary');
    stream.push(buffer);
    stream.push(null);
  } catch (error) {
    throw new Error("Error downloading URL: " + url);
  }
  return await uploadStreamToIPFSAsync(username, password, ipfsAPIUrl, pin, stream, contentType);

}

export { uploadJSONToIPFSAsync, uploadStreamToIPFSAsync, uploadURLToIPFSAsync };


/* test code 
const ipfsUrl = "";
const username = "";
const password = "";
const Json = { "value": "Hola Mundo!" };

console.log(await uploadJSONToIPFSAsync(username, password, ipfsUrl, Json));
console.log(await uploadURLToIPFSAsync(username, password, ipfsUrl, "https://ipfs.bws.ninja/ipfs/QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T"));
*/
