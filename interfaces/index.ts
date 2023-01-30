import React from "react";

export type Version =
  | "dream_world"
  | "crystal"
  | "emerald"
  | "platinum"
  | "default";

export interface AllPokemon {
  name: string;
  pid: string;
  url?: string;
  imageURL?: string;
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string; url: string };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  weight: number;
  height: number;
  flavor_text: string;
}

export interface FlavorText {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
}

export interface APIQuery {
  offset: number;
}

export interface ApiResponse {
  data: AllPokemon[] | Pokemon | [];
  pagination: {
    next: string | undefined | null;
    prev: string | undefined | null;
  };
}
export interface Result {
  result: ApiResponse | null;
  loading: boolean | null;
  error: boolean | null;
}

export interface Page {
  number: number;
  offset: number;
  next: number | null;
  prev: number | null;
}

export interface Pagination {
  page: Page | null | undefined;
  next: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  prev: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}
