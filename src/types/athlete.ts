export type Athlete = {
	rank: number;
	name: string;
};
export type Info = {
	active: boolean;
	nickname: string;
	division: string;
	divisionScore: string;
};
export type Win = {
	method: string;
	total: number;
};
export type Profile = {
	info: Info;
	wins: Win[];
};
