export type Athlete = {
	rank: number;
	name: string;
};
export type Info = {
	active: boolean;
	nickname: string;
	division: string;
};
export type Stat = {
	method: string;
	total: number;
};
export type Profile = {
	info: Info;
	stats: Stat[];
	picture: string;
};
