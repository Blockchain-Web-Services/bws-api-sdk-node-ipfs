import { uploadJSONToIPFSAsync, uploadStreamToIPFSAsync, uploadURLToIPFSAsync } from "./ipfs-bws.mjs";

class BWSIPFS {
    constructor(param1, param2, param3) {
        this.config = sanitizeConfig(param1, param2, param3);
    }

    async uploadJSONAsync(json) {
        return await uploadJSONToIPFSAsync(this.config, json);
    }

    async uploadURLAsync(URL) {
        return await uploadURLToIPFSAsync(this.config, URL);
    }

    async uploadStreamAsync(stream) {
        return await uploadStreamToIPFSAsync(this.config, stream);
    }
}

/*********************/
/* private functions */

function refactorConfig(BWSIPFSConfig) {
    const config = {};
    if (BWSIPFSConfig.username) {
        config.username = BWSIPFSConfig.username;
    } else {
        throw new Error("IPFS server username is required");
    }

    if (BWSIPFSConfig.password) {
        config.password = BWSIPFSConfig.password;
    } else {
        throw new Error("IPFS password username is required");
    }

    if (BWSIPFSConfig.IPFFAPIUrl) {
        config.IPFFAPIUrl = BWSIPFSConfig.IPFFAPIUrl;
    } else {
        throw new Error("IPFS API URL is required");
    }

    return config;
}

function sanitizeConfig(param1, param2, param3) {
    let config = {};

    if (typeof param1 === 'string' && typeof param2 === 'string' && typeof param3 === 'string') {
        config.username = param1;
        config.password = param2;
        config.IPFFAPIUrl = param3;
    }

    const isBWSIPFSConfig = typeof param1 === 'object';
    if (isBWSIPFSConfig) {
        config = refactorConfig(param1);
    }

    return config;
}
/*********************/


export { BWSIPFS };