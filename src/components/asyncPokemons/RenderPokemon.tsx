import { PokemonDataProps } from "./interfaces/pokemonTypes";

const RenderPokemon = ({ name, abilities, sprites, stats }: PokemonDataProps) => {
  const ability = abilities[0]?.ability.name;
  const photo = sprites.front_default;
  const hp = stats[0]?.base_stat;
  const attack = stats[1]?.base_stat;
  const defense = stats[2]?.base_stat;
  const speed = stats[5]?.base_stat;

  return (
    <div>
      <h2>{name}</h2>
      {photo && <img src={photo} alt={name} />}
      <p>Ability: {ability}</p>
      <p>HP: {hp}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>Speed: {speed}</p>
    </div>
  );
};

export default RenderPokemon;