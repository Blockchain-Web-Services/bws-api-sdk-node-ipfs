# Save a JSON into IPFS

This is a very simple example on how to save a JSON into the IPFS using Blockchain Web Services BWS.IPFS.Upload solution.

- Signup and get your API Key at [www.bws.ninja](https://wwww.bws.ninja).
- Create an ```.env``` file on this folder and set your environment variable 
```BWS_API_KEY```

    ```bash
    BWS_API_KEY=<your api key>
    ```
- Run the example, ```node ./index.mjs```.
- You will get a response with your newly create IPFS file details, as for example:

    ```json
    {
    cid: "QmTNm5niQNWSkiPTsR2DX8mFxdZzm8Vz7nr77hqppVpRzS",
    uris: {
        ipfs: "ipfs://QmTNm5niQNWSkiPTsR2DX8mFxdZzm8Vz7nr77hqppVpRzS",
        url: "https://ipfs.bws.ninja/ipfs/QmTNm5niQNWSkiPTsR2DX8mFxdZzm8Vz7nr77hqppVpRzS"
    }
    }
    ```

That's it, you can now easily send your JSON content to IPFS ;)