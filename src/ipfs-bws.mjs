import fs from 'fs';

import { apiCallUrl } from './constants.mjs';
import { callAxios } from './ipfs-bws_axios-wrapper.mjs';


/**
 * ! private function to prepare axios call to BWS IPFS API
 * @param {config} object bws.ninja IPFS config
 * @param {payloadParameters} json payload IPFS API parameters (check docs.bws.ninja)
 * @returns JSON object with IPFS hash and IPFS urls
 * {
      cid: "cid",
      uris: {
        ipfs: "ipfs://cid",
        url: "https://ipfs.bws.ninja/ipfs/cid"
      }
    }
 */
async function uploadToIPFSAsync(config, payloadParameters) {

  let payload = {
    "solution": "BWS.IPFS.Upload",
    "operation": "new"
  };

  if (payloadParameters) {
    payload.parameters = payloadParameters;
  }

  const data = JSON.stringify(payload);

  // axios call config
  let axiosRequestConfig = {
    method: 'post',
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    url: apiCallUrl,
    headers: {
      'X-Api-Key': config.apikey,
      'Content-Type': 'application/json'
    },
    data: data
  };

  // axios call
  return callAxios(axiosRequestConfig);
}


/**
 * ? Uplaod json into IPFS server.
 * @param {config} object bws.ninja IPFS config
 * @param {json} json json object to save into IPFS
 * @param {description} string description of content to save into IPFS
 * @returns JSON object with IPFS hash and IPFS urls
 */
async function uploadJSONToIPFSAsync(config, json, description) {

  switch (typeof json) {
    case 'object':
      try {
        JSON.parse(JSON.stringify(json));
      } catch (error) {
        throw new Error('invalid json');
      }
      break;
    case 'string':
      try {
        json = JSON.parse(json);
      } catch (error) {
        throw new Error('invalid json');
      }
      break;
    default:
      throw new Error('invalid json');
  }

  if (description && typeof description !== 'string') {
    throw new Error('description must be a string');
  }

  let payloadParameters = {
    "content": json
  };

  if (description) {
    payloadParameters.description = description;
  }

  return uploadToIPFSAsync(config, payloadParameters);
}

/**
 * ? Upload json into IPFS server and return ipfs hash.
 * @param {config} object bws.ninja IPFS config
 * @param {string} filePath to the file to save into IPFS
 * @param {description} string description of content to save into IPFS
 * @returns JSON object with IPFS hash and IPFS urls
 */
async function uploadFileToIPFSAsync(config, filePath, description) {

  if (typeof filePath !== 'string') {
    throw new Error('invalid file path');
  }

  /* we check if the file exists */
  if (!fs.existsSync(filePath)) {
    throw new Error('file does not exist');
  }

  if (description && typeof description !== 'string') {
    throw new Error('description must be a string');
  }

  /* we read the image to send to IPFS */
  const fileData = fs.readFileSync(filePath);

  /* we encode image data */
  const encodedData = fileData.toString('base64');

  let payloadParameters = {
    "content": encodedData
  };

  if (description) {
    payloadParameters.description = description;
  }

  return uploadToIPFSAsync(config, payloadParameters);
}

/**
 * ? Upload json into IPFS server and return ipfs hash.
 * @param {config} object bws.ninja IPFS config
 * @param {stream} stream to save into IPFS
 * @param {description} string description of content to save into IPFS
 * @returns JSON object with IPFS hash and IPFS urls
 */
async function uploadStreamToIPFSAsync(config, stream, description) {

  if (!stream || typeof stream.pipe !== 'function') {
    throw new Error('invalid stream');
  }

  if (description && typeof description !== 'string') {
    throw new Error('description must be a string');
  }

  // encode stream data as base64
  let encodedData = '';
  for await (const chunk of stream) {
    encodedData += chunk.toString('base64');
  }

  let payloadParameters = {
    "content": encodedData,
  };

  if (description) {
    payloadParameters.description = description;
  }

  return uploadToIPFSAsync(config, payloadParameters);

}


export { uploadJSONToIPFSAsync, uploadFileToIPFSAsync, uploadStreamToIPFSAsync, callAxios };



