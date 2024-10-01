import { baseUrl } from "../config";
import { parseRanking } from "../parsers/ranking";
import { Ranking } from "../types/ranking";

export async function getRanking():Promise<Ranking[]> {
    try {
        const rankingReponse = await fetch(`${baseUrl}/rankings`);
        const rankingHtml = await rankingReponse.text();
        const ranking = parseRanking(rankingHtml);
        return ranking;
    } catch (error) {
        return []
    }
}
const ranking = {
	getRanking,
};
export default ranking;
