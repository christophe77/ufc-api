import * as cheerio from 'cheerio';

import { Info, Profile, Stat } from '../types/athlete';

export function parseAthlete(athleteHtml: string): Profile {
	const $ = cheerio.load(athleteHtml);
	// Info
	let isActive = false;
	const tags = $('.hero-profile__tag');
	tags.each((_tagIndex, tag) => {
		switch ($(tag).text()) {
			case 'Active':
				isActive = true;
				break;
			case 'Activo':
				isActive = true;
				break;
			case 'Activa':
				isActive = true;
				break;
			case 'Actif':
				isActive = true;
				break;
			default:
				break;
		}
	});
	const info: Info = {
		active: isActive,
		nickname: $('.hero-profile__nickname').text().replace(/['"]+/g, ''),
		division: $('.hero-profile__division-title').text(),
	};
	// Stats
	const stats: Stat[] = []

	const overallStatsElements = $('.athlete-stats__stat');

	overallStatsElements.each((_statIndex, stat) => {
		stats.push({
			method: $(stat).find('.athlete-stats__stat-text').text(),
			total: Number($(stat).find('.athlete-stats__stat-numb').text()),
		});
	});
	// Picture
	const picture : string = $('.hero-profile__image-wrap').find('img').attr('src') || "";
	
	const profile: Profile = {
		info,
		stats,
		picture
	};
	console.log(JSON.stringify(profile))
	return profile;
}
