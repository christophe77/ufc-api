import * as cheerio from 'cheerio';
import { Ranking } from '../types/ranking';
import { Athlete } from '../types/athlete';

export function parseRanking(rankingHtml: string): Ranking[] {
	const ranking: Ranking[] = [];

	const $ = cheerio.load(rankingHtml);

	const categoryElementArray = $('.view-grouping-content');

	categoryElementArray.each((_categoryIndex, categoryElement) => {
		const category: string = $(categoryElement).find('.info h4').text();
		const athletes: Athlete[] = [];
		const athleteLinks = $(categoryElement).find('a');
		athleteLinks.each((athleteLinkIndex, athleteLink) => {
			athletes.push({
				rank: athleteLinkIndex + 1,
				name: $(athleteLink).text(),
			});
		});
		ranking.push({ category, athletes });
	});
	return ranking;
}
