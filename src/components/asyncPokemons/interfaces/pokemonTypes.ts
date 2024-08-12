export interface PokemonDataProps {
  name: string;
  abilities: Ability[];
  sprites: {
    [key: string]: string | null;
  };
  stats: Stat[];
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}