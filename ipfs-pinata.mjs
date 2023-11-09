import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const pinataSDK = require('@pinata/sdk');

const { Readable } = require('stream')
import axios from 'axios';

/**
 * Uplaod NFT metadata into IPFS server and return ipfs url.
 * @param {ipfsKey} string Pinata API key
 * @param {ipfsSecretKey} string Pinata API Secret key
 * @param {nftJson} json NFT json
 * @returns IPFS Hash
 */
async function uploadJSONToIPFSAsync_Pinata(ipfsKey, ipfsSecretKey, nftJson) {
  const pinata = new pinataSDK({ pinataApiKey: ipfsKey, pinataSecretApiKey: ipfsSecretKey });
  return (await pinata.pinJSONToIPFS(nftJson)).IpfsHash;
}

/**
 * Uplaod NFT metadata into IPFS server and return ipfs url.
 * @param {ipfsKey} string Pinata API key
 * @param {ipfsSecretKey} string Pinata API Secret key
 * @param {stream} ReadStream for file to upload
 * @returns IPFS Hash
 */
async function uploadStreamToIPFSAsync_Pinata(ipfsKey, ipfsSecretKey, stream) {

  const pinata = new pinataSDK({ pinataApiKey: ipfsKey, pinataSecretApiKey: ipfsSecretKey });
  const options = {
    pinataMetadata: {
      name: "bws"
    }
  };

  return (await pinata.pinFileToIPFS(stream, options)).IpfsHash;
}


/**
 * Uplaod NFT metadata into IPFS server and return ipfs url.
 * @param {ipfsKey} string Pinata API key
 * @param {ipfsSecretKey} string Pinata API Secret key
 * @param {url} string URL to file to upload
 * @returns IPFS Hash
 */
async function uploadURLToIPFSAsync_Pinata(ipfsKey, ipfsSecretKey, url) {

  let response = await axios.get(encodeURI(url), {
    responseType: 'arraybuffer',
  })

  var buffer = Buffer.from(response.data, 'binary');
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return await uploadStreamToIPFSAsync_Pinata(ipfsKey, ipfsSecretKey, stream);

}



export { uploadJSONToIPFSAsync_Pinata, uploadStreamToIPFSAsync_Pinata, uploadURLToIPFSAsync_Pinata };
