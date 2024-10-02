"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  athlete: () => athlete_default,
  ranking: () => ranking_default
});

// src/config.ts
var baseUrl = "https://www.ufc.com";

// src/parsers/ranking.ts
var cheerio = __toESM(require("cheerio"));
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
var import_lodash = __toESM(require("lodash"));

// src/parsers/athlete.ts
var cheerio2 = __toESM(require("cheerio"));
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
      const formattedName = import_lodash.default.deburr(name).replace(/ /g, "-").toLowerCase();
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
//# sourceMappingURL=index.js.map