import { useState } from "react";
import RenderPokemon from "./RenderPokemon";
import getPokemon from "./getPokemon";
import getRandomId from "./getRandomId";
import { PokemonDataProps } from "./interfaces/pokemonTypes";

const PokemonComplex = (): JSX.Element => {
  const [pokemonData, setPokemonData] = useState<PokemonDataProps | null>(null);
  const id = getRandomId();


    const fetchData = async () => {
      const data = await getPokemon(id);
      setPokemonData(data);
    };

  return (
    <>
      <button onClick={fetchData}>Pikachu, I choose you!</button>
      {pokemonData ? (
        <RenderPokemon {...pokemonData} />
      ) : (
        <p>Click the button ☝️</p>
      )}
    </>
  );
};

export default PokemonComplex;
