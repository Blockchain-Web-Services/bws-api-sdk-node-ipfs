import { uploadJSONToIPFSAsync, uploadStreamToIPFSAsync } from "./ipfs-bws.mjs";

class BWSIPFS {
    constructor(param1) {
        this.config = sanitizeConfig(param1);
    }

    async uploadJSONAsync(json) {
        return await uploadJSONToIPFSAsync(this.config, json);
    }

    async uploadStreamAsync(stream, contentType = "application/octet-stream") {
        return await uploadStreamToIPFSAsync(this.config, stream, true, contentType);
    }
}

/*********************/
/* private functions */

function refactorConfig(jsonParam) {
    const config = {};
    if (jsonParam.apikey) {
        config.apikey = jsonParam.apikey;
    } else {
        throw new Error("BWS API Key is required. Go www.bws.ninja to get one.");
    }
    return config;
}

function sanitizeConfig(param1) {
    let config = {};

    if (typeof param1 === 'string') {
        config.apikey = param1;
    }

    const isJsonParam = typeof param1 === 'object';
    if (isJsonParam) {
        config = refactorConfig(param1);
    }

    return config;
}
/*********************/


export { BWSIPFS };