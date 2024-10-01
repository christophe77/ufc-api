import _ from 'lodash';
import { baseUrl } from '../config';
import { parseAthlete } from '../parsers/athlete';
import { Profile } from '../types/athlete';

export async function getProfile(name: string): Promise<Profile> {
	try {
		const formattedName = _.deburr(name).replace(/ /g, '-').toLowerCase();
		const profileReponse = await fetch(`${baseUrl}/athlete/${formattedName}`);
		const profileHtml = await profileReponse.text();
		const profile = parseAthlete(profileHtml);
		return profile;
	} catch (error) {
		return {
			info: {
				active: false,
				nickname: '',
				division: '',
				divisionScore: '',
			},
			wins: [],
		};
	}
}
const athlete = {
	getProfile,
};
export default athlete;
