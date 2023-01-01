# orbis-pkp-action
_If This Then That_ for Orbis
to automate Orbis SDK via Lit Protocol PKP's actions, 
triggered by numerous web2 and web3 services

https://vimeo.com/785515999

example use-cases:
- post scheduler (craft out posts and publish at the right moment in Google calendar)
- retweet (watch a twitter account and retweet)
- NFT sales bot
- channel announcement bots

## reference implementations

check out [pages/api/orbis-pkp-action](pages/api/orbis-pkp-action)
- [nft-sales-bot.ts](pages/api/orbis-pkp-action/nft-sales-bot.ts)
- [post-scheduler.ts](pages/api/orbis-pkp-action/post-scheduler.ts)
- [retweet.ts](pages/api/orbis-pkp-action/retweet.ts)

## how is it built?

built using NextJS to setup API routes as files
check the folder: [pages/api/orbis-pkp-action](pages/api/orbis-pkp-action) for the files

one file is used to listen and process one webhook

simple and straight forward :D

`.env` is used to managed config privately which can easily configured (i.e Vercel, Netlify, Heroku)

triggers are setup via IFTTT, Zapier for web2 and Helius.xyz for web3.
webhook calls are then processed

## how to run locally

to run it _locally_
`npm run dev` 

then to expose the local instance to the web
run ngrok
`ngrok http 3000`

_ngrok_ will then give the web url
use that web url to setup triggers

## how to deploy to the web

to run it _on the web_
deploy to any of your favorite host (Vercel, Netlify, Heroku, etc)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F0xStruct%2Forbis-pkp-action)

Vercel runs the APIs as serverless functions,
_but_ as the free plan has timeout of 5 secs
sign up for a paid plan

## how to setup the post scheduler with IFTTT and Google Calender

video guide will be here: https://vimeo.com/showcase/10085247

## how to setup NFT sales bot with Helius.xyz

video guide will be here: https://vimeo.com/showcase/10085247

## how to setup Twitter Retweet bot with IFTTT or Zapier

video guide will be here: https://vimeo.com/showcase/10085247
