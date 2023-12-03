import { uploadJSONToIPFSAsync, uploadFileToIPFSAsync, uploadStreamToIPFSAsync, callAxios } from "./ipfs-bws.mjs";

class BWSIPFS {
    constructor(param1) {
        this.config = sanitizeConfig(param1);
    }

    /* SDK functions */

    async uploadJSONAsync(json, description) {
        return await uploadJSONToIPFSAsync(this.config, json, description);
    }

    async uploadFileAsync(filePath, description) {
        return await uploadFileToIPFSAsync(this.config, filePath, description);
    }

    async uploadStreamAsync(stream, description) {
        return await uploadStreamToIPFSAsync(this.config, stream, description);
    }
}


/* private functions */

function refactorConfig(jsonParam) {
    const config = {};
    if (jsonParam?.apikey) {
        config.apikey = jsonParam.apikey;
    } else {
        throw new Error("BWS API Key is required. Go www.bws.ninja to get one.");
    }
    return config;
}

function sanitizeConfig(param1) {
    let config = {};

    switch (typeof param1) {
        case 'string':
            if (!param1) throw new Error("BWS API Key is required. Go www.bws.ninja to get one.");
            config.apikey = param1;
            break;
        case 'object':
            config = refactorConfig(param1);
            break;
        default:
            throw new Error("BWS API Key is required. Go www.bws.ninja to get one.");
    }

    return config;
}



export { BWSIPFS };