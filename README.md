# orbis-pkp-action
If This Then That for Orbis
automate Orbis SDK via Lit Protocol PKP's actions, triggered by numerous services of web2 and web3

https://vimeo.com/785515999

example use-cases:
- post scheduler (craft out posts and publish at the right moment in Google calendar)
- retweet (watch a twitter account and retweet)
- NFT sales bot
- Announcement bots

## reference implementations

check out [pages/api/orbis-pkp-action](pages/api/orbis-pkp-action)
- [nft-sales-bot.ts](pages/api/orbis-pkp-action/nft-sales-bot.ts)
- [post-scheduler.ts](pages/api/orbis-pkp-action/post-scheduler.ts)
- [retweet.ts](pages/api/orbis-pkp-action/retweet.ts)

## how is it built?

built using NextJS to setup API routes as files in the folder: [pages/api/orbis-pkp-action](pages/api/orbis-pkp-action)
one file is used to listen and process one webhook

`.env` is used to managed config privately which can easily configured (i.e Vercel, Netlify, Heroku)

triggers are setup via IFTTT, Zapier for web2 and Helius.xyz for web3.
webhook calls are then processed

## how to run

`npm run dev` to run it locally
to expose local instance to webhook calls, run ngrok
`ngrok http 3000`

_ngrok_ will then give the web url
use that web url to setup triggers

## how to setup the post scheduler with IFTTT and Google Calender

https://vimeo.com/785515999
