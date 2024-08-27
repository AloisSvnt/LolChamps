export interface Ability {
  id: string;
  name: string;
  description: string;
  image: {
    full: string;
  };
}

export interface ChampData {
  id: string;
  name: string;
  image: {
    full: string;
  };
  spells: Ability[];
  [key: string]: any;
}

export interface ChampsState {
  champs: Record<string, ChampData>;
  champsImages: Record<string, string>;
  champsAbilities: Record<string, Ability[]>;
  champsAbilitiesImages: Record<string, string[]>;
}