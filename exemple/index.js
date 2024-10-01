const ufcapi = require('../dist').default;

async function getRanking() {
    const todayRanking = await ufcapi.ranking.getRanking();
    console.log("Today ranking : ", JSON.stringify(todayRanking));
}
async function getAthleteProfile(name) {
    const athleteProfile = await ufcapi.athlete.getProfile();
    console.log("Athlete profile : ", JSON.stringify(athleteProfile));
}
async function start(){
    await getRanking();
    await getAthleteProfile('abdul kareem al selwady')
}
start();
