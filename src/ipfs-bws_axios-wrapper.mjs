import axios from 'axios';

/**
 * ? wrap axios call to BWS IPFS API (mocked in tests)
 * @param {axiosRequestConfig} object call config
 * @param {payloadParameters} json payload IPFS API parameters (check docs.bws.ninja)
 * @returns JSON object with IPFS hash and IPFS urls
 */
async function callAxios(axiosRequestConfig) {

    return new Promise((resolve, reject) => {
        axios.request(axiosRequestConfig)
            .then(function (result) {
                if (result.status !== 200 || !result.data || !result.data.statusCode) {
                    reject(new Error(`unexpected error adding content to IPFS: ${result}`));
                }

                /* status code returned by BWS API reponse */
                switch (result.data.statusCode) {
                    case 200:
                        resolve(result.data.info);
                        break;
                    default:
                        reject(new Error(`unexpected error adding content to IPFS: ${result.data?.statusMessage || result.data?.statusCode}`));
                        break;
                }
            }).catch(function (error) {
                if (error?.response?.data && error?.response?.data?.statusMessage?.includes('invalid content type')) {
                    reject(new Error('invalid content type, only json, pdf and images are supported (png, jpg, jpeg, gif, bmp, tiff)'));
                } else
                    reject(error);
            });
    });

}

export { callAxios };