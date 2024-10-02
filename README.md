# UFC API JS

Unofficial UFC API for JavaScript.
Uses cheerio to scrap the data from ufc.com

## Install

    yarn add ufc-api-js

    npm i ufc-api-js

## Usage

    import ufcapi from 'ufc-api-js'; // esm
    const ufcapi = require('ufc-api-js').default; // cjs

    // Get current ranking
    const todayRanking = await ufcapi.ranking.getRanking();

    // Response
    // [
    //   {
    //		"category": "Men's Pound-for-Pound Top Rank",
    //		"athletes": [
    //			{ "rank": 1, "name": "Islam Makhachev" },
    //			{ "rank": 2, "name": "Islam Makhachev" },
    //			...
    //		]
    //  },
    //  {
    //		"category": "Flyweight",
    //		"athletes": [
    //			{ "rank": 1, "name": "Alexandre Pantoja" },
    //			{ "rank": 2, "name": "Brandon Royval" },
    //			...
    //		]
    //  },
    //  ...
    // ]


    // Get athlete informations
    const athleteInfos = await ufcapi.athlete.getProfile('conor mcgregor');

    // Response
    // {
    //    info: {
    //       active: true,
    //        nickname: 'The Notorious',
    //        division: 'Lightweight Division',
    //        divisionScore: '22-6-0 (W-L-D)'
    //    },
    //    stats: [
    //        { method: 'Wins by Knockout', total: 19 },
    //        { method: 'Wins by Submission', total: 1 },
    //        { method: 'Former Champion', total: 1 }
    //    ],
    //    picture : 'https://ufc.com/images/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png?itok=xbg9Kwfj'
    // }
