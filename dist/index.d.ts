type Athlete = {
    rank: number;
    name: string;
};
type Info = {
    active: boolean;
    nickname: string;
    division: string;
};
type Stat = {
    method: string;
    total: number;
};
type Profile = {
    info: Info;
    stats: Stat[];
    picture: string;
};

type Ranking = {
    category: string;
    athletes: Athlete[];
};

declare function getRanking(): Promise<Ranking[]>;
declare const ranking: {
    getRanking: typeof getRanking;
};

declare function getProfile(name: string): Promise<Profile>;
declare const athlete: {
    getProfile: typeof getProfile;
};

declare const ufcapi_athlete: typeof athlete;
declare const ufcapi_ranking: typeof ranking;
declare namespace ufcapi {
  export { ufcapi_athlete as athlete, ufcapi_ranking as ranking };
}

export { ufcapi as default };
