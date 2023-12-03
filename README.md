# BWS IPFS SDK

Official Blockchain Web Services IPFS solution NodeJS SDK.

## Overview

BWS IPFS SDK provides the easiest way to call [BWS.IPFS.Upload solution API](https://docs.bws.ninja/solutions/bws.ipfs.upload).

## Installation

```bash
npm install --save @bws-sdk/ipfs
```

## How to use it

Once installed, just import the BWS IPFS SDK, create an instance using your API Key and start using the available functions (go [www.bws.ninja](https://www.bws.ninja) and sign up to get your API Key - it's free).

```javascript
import { BWSIPFS } from @bws-sdk/ipfs;
const ipfs = new BWSIPFS('<your API key>')
```

## Operations

Use [uploadJSONAsync](#uploadJSONAsync-anchor), [uploadFileAsync](#uploadFileAsync-anchor) or [uploadStreamAsync](#uploadStreamAsync-anchor) to save your content to the IPFS (Inter Planetary File System).

All the operations will return the following IPFS related information (pointing to your newly created IPFS file):

```json
{
    cid: "QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T",
    uris: {
        ipfs: "ipfs://QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T",
        url: "https://ipfs.bws.ninja/ipfs/QmU7avmnTb4iVbNGCHMJmdEbsx9nRtUx7dWGpKeE7zjo8T"
    }
}
```

<a name="uploadJSONAsync-anchor"></a>
### `uploadJSONAsync`

Upload a JSON to IPFS.

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

Please feel free to file an issue () or send us an email: hello@bws.ninja.

## Need an extended feature?

Please do not hesitate to ask for an extended feature, we love improving!
