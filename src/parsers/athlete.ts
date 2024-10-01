import * as cheerio from 'cheerio';

import { Info, Profile, Win } from '../types/athlete';

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
		divisionScore: $('.hero-profile__division-body').text(),
	};
	// Wins
	const wins: Win[] = [];
	const stats = $('.hero-profile__stat');
	stats.each((_statIndex, stat) => {
		wins.push({
			method: $(stat).find('.hero-profile__stat-text').text(),
			total: Number($(stat).find('.hero-profile__stat-numb').text()),
		});
	});
	
	const profile: Profile = {
		info,
		wins,
	};
	return profile;
}
