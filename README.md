# BWS IPFS SDK

Official Blockchain Web Services [IPFS solution](https://docs.bws.ninja/solutions/bws.ipfs.upload) NodeJS SDK.

[![Create Release](https://github.com/Blockchain-Web-Services/bws-api-sdk-node-ipfs/actions/workflows/on-push_create-release.yml/badge.svg?branch=master)](https://github.com/Blockchain-Web-Services/bws-api-sdk-node-ipfs/actions/workflows/on-push_create-release.yml)

## Overview

Blockchain Web Services (BWS) is a comprehensive platform offering a suite of blockchain-based solutions, designed to simplify and enhance the integration of blockchain technology into various business and individual needs.

This SDK provides the easiest way to save data into the [InterPlanetary File System (IPFS)](https://en.wikipedia.org/wiki/InterPlanetary_File_System). Use it to save your NFT metadata and images.

## Installation

```bash
npm install --save @bws-sdk/ipfs
```

## How to use it

Once installed, just import the SDK, create an instance using your API Key and start using the available functions. To get your API Key go to [www.bws.ninja](https://www.bws.ninja) and sign up - it's free.

```javascript
import { BWSIPFS } from @bws-sdk/ipfs;
const ipfs = new BWSIPFS('<your API key>')
```

## Operations

Use the following available operations:

- [uploadJSONAsync](#uploadJSONAsync-anchor) to save JSON data (e.g. NFT Metadata), 
- [uploadFileAsync](#uploadFileAsync-anchor) to upload images or PDF files, or 
- [uploadStreamAsync](#uploadStreamAsync-anchor) if you need to pass a stream for sending your file(s).

All the operations will return the following IPFS related information (pointing to your newly created IPFS file):

```json
{
    "cid": "QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T",
    "uris": {
        "ipfs": "ipfs://QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T",
        "url": "https://ipfs.bws.ninja/ipfs/QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T"
    }
}
```

<a name="uploadJSONAsync-anchor"></a>
### `uploadJSONAsync`

Upload a JSON to IPFS. You can pass the JSON object or the string representation.

```javascript
import { BWSIPFS } from @bws-sdk/ipfs;
const ipfs = new BWSIPFS('<your API key>')

await ipfs.uploadJSONAsync({ timestamp: Date.now() }).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```


<a name="uploadFileAsync-anchor"></a>
### `uploadFileAsync`

Upload a file to IPFS by indicating the file path.

```javascript
import { BWSIPFS } from @bws-sdk/ipfs;
const ipfs = new BWSIPFS('<your API key>')

await ipfs.uploadFileAsync('./files/image.png').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```

<a name="uploadStreamAsync-anchor"></a>
### `uploadStreamAsync`

Upload content to IPFS by passing a stream.

```javascript
import fs from 'fs';

import { BWSIPFS } from @bws-sdk/ipfs;
const ipfs = new BWSIPFS('<your API key>')

await ipfs.uploadFileAsync(fs.createReadStream('./files/image.png').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```

## Have a question? Found an issue?

Please feel free to file an [issue](https://github.com/Blockchain-Web-Services/bws-api-sdk-node-ipfs/issues) or send us an email: hello@bws.ninja.

## Need an extended feature or some help?

Please do not hesitate to ask for help or an extended feature for your project use case, we love improving!
