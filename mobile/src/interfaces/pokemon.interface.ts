export default interface Pokemon {
  number: number;
  name: string;
  image: string;
  types: Type[];
  color: string;
  pokedexNumber: string;
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
