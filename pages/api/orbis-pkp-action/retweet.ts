import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import Cors from 'cors';

import { DID } from "dids";
import {
    encodeDIDWithLit,
    Secp256k1ProviderWithLit,
} from "key-did-provider-secp256k1-with-lit";
import { getResolver } from "key-did-resolver";
import { Orbis } from "@orbisclub/orbis-sdk";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
});
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Run the middleware
    await runMiddleware(req, res, cors);

    if (req.method === "POST") {
        const rawBody = (await buffer(req)).toString();
        console.log("rawBody: ", rawBody);
        const data = JSON.parse(rawBody);
        console.log(data.title);
        try {
            console.log(JSON.parse(data.post));
        } catch (error) {
            console.log(data.post);
        }

        //res.status(200).end();
        //return;


        //const postText = "Hola! Pinata!";

        // Lit action JS's IPFS address
        const ipfsId = "Qma1H5pY89PooSJeoQAmADxP55scevbt9j3zucFrrzzQJb";

        // get DID from the Lit PKP's publickey
        const encodedDID = await encodeDIDWithLit(
            "04df98f62aae4be61145a236b9ba0294292045b8ed87c6946627399de0ef83865cbefc30ce4a380775647a2601df6ab0b1b75a43951185253a1053826e240bb4b7"
        );

        const provider = new Secp256k1ProviderWithLit({
            did: encodedDID,
            ipfsId: ipfsId as string,
            // @ts-ignore
            authSig: {
                "sig": "0x4e97bc3c2ab08fe7e6beef7828ecb7bebbd569be31e65ce982792c501a9da1952a1449c3666ba0222081a08819e39cde57a26f5086c6a5026f849bb6d896087d1c",
                "derivedVia": "web3.eth.personal.sign",
                "signedMessage": "vercel-test-npm.vercel.app wants you to sign in with your Ethereum account:\n0xa46574434328a8594851b5267EC0a4e6aB14316f\n\n\nURI: https://vercel-test-npm.vercel.app/action?pkpPublicKey=04df98f62aae4be61145a236b9ba0294292045b8ed87c6946627399de0ef83865cbefc30ce4a380775647a2601df6ab0b1b75a43951185253a1053826e240bb4b7&lockAddress=0x9cb8cbebc75256d05517bcef66bba2cc68eac7fb&ipfsId=Qma1H5pY89PooSJeoQAmADxP55scevbt9j3zucFrrzzQJb\nVersion: 1\nChain ID: 80001\nNonce: WZuKGmFSE1W0ifdpe\nIssued At: 2022-12-29T13:05:51.452Z\nExpiration Time: 2023-01-05T13:05:43.158Z",
                "address": "0xa46574434328a8594851b5267EC0a4e6aB14316f"
            }
        });

        // authenticate PKP's DID
        const did = new DID({ provider, resolver: getResolver() });
        try {
            await did.authenticate();
        } catch (error) {
            console.error(error);

            if (error.message === "Unauthorized to sign") {
                console.log("Unauthorized: user is not part of the team");
                res.status(500).send("Unauthorized: user is not part of the team");
            }

            console.log("DID authentication failed with error: " + error.message);
            res.status(500).send("DID authentication failed with error: " + error.message);
        }

        // Connect DID to the Orbis
        let orbis = new Orbis();
        orbis.ceramic.did = did;
        orbis.session = {};
        orbis.session.id = did.id;

        // Now can do whaterver calls to Orbis SDK
        // check out Orbis SDK documentation
        try {
            // create a post on Orbis
            await orbis.createPost(
                data.post
            );
        } catch (error) {
            console.error(error);
            console.log("Orbis action failed with error: " + error.message);

            res.status(500).send("Orbis action failed with error: " + error.message);
        }

        res.status(200).json("Orbis action success!");
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).send("Method Not Allowed");
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}