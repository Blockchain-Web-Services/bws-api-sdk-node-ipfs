import axios from 'axios';

import { apiCallUrl } from './constants.mjs';

/**
 * ? Uplaod json into IPFS server and return ipfs hash.
 * @param {config} object bws.ninja IPFS config
 * @param {json} json json object to save into IPFS
 * @returns IPFS Hash
 */
async function uploadJSONToIPFSAsync(config, json, description) {

  // we check if the json is a valid json
  try {
    JSON.parse(JSON.stringify(json));
  } catch (error) {
    throw new Error('invalid json');
  }

  // BWS API body
  let data = JSON.stringify({
    "solution": "BWS.IPFS.Upload",
    "operation": "new",
    "parameters": {
      "content": json
    }
  });

  // we check if the description is a valid string
  if (description && typeof description === 'string') {
    // we add the description to the body parameters 
    data.parameters.description = description;
  }

  // axios call config
  let axiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: apiCallUrl,
    headers: {
      'X-Api-Key': config.apikey,
      'Content-Type': 'application/json'
    },
    data: data
  };

  // axios call
  return new Promise((resolve, reject) => {
    axios.request(axiosRequestConfig)
      .then(function (result) {
        if (result.status !== 200 || !result.data || !result.data.statusCode) {
          reject(new Error(`unexpected error adding content to IPFS: ${result}`));
        }

        switch (result.data.statusCode) {
          case 200:
            resolve(result.data.info);
            break;
          default:
            reject(new Error(`unexpected error adding content to IPFS: ${result.data?.statusMessage || result.data?.statusCode}`));
            break;
        }
      }).catch(function (error) {
        reject(error);
      });
  });



}

/**
 * ? Upload json into IPFS server and return ipfs hash.
 * @param {config} object bws.ninja IPFS config
 * @param {stream} stream to save into IPFS
 * @returns IPFS Hash
 */
async function uploadStreamToIPFSAsync(config, stream) {

}


export { uploadJSONToIPFSAsync, uploadStreamToIPFSAsync };



