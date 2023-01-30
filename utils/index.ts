import { APIQuery, FlavorText, Version } from "@/interfaces";

const sprites = {
  dream_world: {
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/",
    imgType: "svg",
  },
  crystal: {
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/",
    imgType: "png",
  },
  emerald: {
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/",
    imgType: "png",
  },
  platinum: {
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/",
    imgType: "png",
  },
  default: {
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/",
    imgType: "svg",
  },
};

export const getAPIQuery = ({ offset }: APIQuery): string => {
  return `?offset=${offset}&limit=20`;
};

export const getPokemonID = (url: string) => {
  return url
    .split("/")
    .filter((str) => str !== "")
    .at(-1);
};

export const getFlavorText = (arr: FlavorText[] | [], lang: string) => {
  if (arr.length === 0) return "No dex entry found. It must be a rare pokemon!";

  return arr.find(({ language }) => language.name === lang)?.flavor_text;
};

export const parseURL = (ver: Version, pid: string): string => {
  return `${sprites[ver].url}${pid}.${sprites[ver].imgType}`;
};

export const getVersionQuery = (query: string): Version => {
  return Object.keys(sprites).includes(query) ? (query as Version) : "default";
};

export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1, str.length);

export const calcPageOffset = (pageNumber: number): number => {
  return (+pageNumber - 1) * 20;
};
