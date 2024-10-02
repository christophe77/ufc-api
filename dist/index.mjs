var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  athlete: () => athlete_default,
  ranking: () => ranking_default
});

// src/config.ts
var baseUrl = "https://www.ufc.com";

// src/parsers/ranking.ts
import * as cheerio from "cheerio";
function parseRanking(rankingHtml) {
  const ranking2 = [];
  const $ = cheerio.load(rankingHtml);
  const categoryElementArray = $(".view-grouping-content");
  categoryElementArray.each((_categoryIndex, categoryElement) => {
    const category = $(categoryElement).find(".info h4").text();
    const athletes = [];
    const athleteLinks = $(categoryElement).find("a");
    athleteLinks.each((athleteLinkIndex, athleteLink) => {
      athletes.push({
        rank: athleteLinkIndex + 1,
        name: $(athleteLink).text()
      });
    });
    ranking2.push({ category, athletes });
  });
  return ranking2;
}

// src/lib/ranking.ts
function getRanking() {
  return __async(this, null, function* () {
    try {
      const rankingReponse = yield fetch(`${baseUrl}/rankings`);
      const rankingHtml = yield rankingReponse.text();
      const ranking2 = parseRanking(rankingHtml);
      return ranking2;
    } catch (error) {
      return [];
    }
  });
}
var ranking = {
  getRanking
};
var ranking_default = ranking;

// src/lib/athlete.ts
import _ from "lodash";

// src/parsers/athlete.ts
import * as cheerio2 from "cheerio";
function parseAthlete(athleteHtml) {
  const $ = cheerio2.load(athleteHtml);
  let isActive = false;
  const tags = $(".hero-profile__tag");
  tags.each((_tagIndex, tag) => {
    switch ($(tag).text()) {
      case "Active":
        isActive = true;
        break;
      case "Activo":
        isActive = true;
        break;
      case "Activa":
        isActive = true;
        break;
      case "Actif":
        isActive = true;
        break;
      default:
        break;
    }
  });
  const info = {
    active: isActive,
    nickname: $(".hero-profile__nickname").text().replace(/['"]+/g, ""),
    division: $(".hero-profile__division-title").text()
  };
  const stats = [];
  const overallStatsElements = $(".athlete-stats__stat");
  overallStatsElements.each((_statIndex, stat) => {
    stats.push({
      method: $(stat).find(".athlete-stats__stat-text").text(),
      total: Number($(stat).find(".athlete-stats__stat-numb").text())
    });
  });
  const picture = $(".hero-profile__image-wrap").find("img").attr("src") || "";
  const profile = {
    info,
    stats,
    picture
  };
  console.log(JSON.stringify(profile));
  return profile;
}

// src/lib/athlete.ts
function getProfile(name) {
  return __async(this, null, function* () {
    try {
      const formattedName = _.deburr(name).replace(/ /g, "-").toLowerCase();
      const profileReponse = yield fetch(`${baseUrl}/athlete/${formattedName}`);
      const profileHtml = yield profileReponse.text();
      const profile = parseAthlete(profileHtml);
      return profile;
    } catch (error) {
      return {
        info: {
          active: false,
          nickname: "",
          division: ""
        },
        stats: [],
        picture: ""
      };
    }
  });
}
var athlete = {
  getProfile
};
var athlete_default = athlete;

// src/index.ts
var src_default = lib_exports;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map