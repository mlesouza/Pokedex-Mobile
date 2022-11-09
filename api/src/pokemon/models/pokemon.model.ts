export default class Pokemon {
  number: number;
  name: string;
  image: string;
  imageHome: string;
  imageDreamWorld: string;
  types: Type[];
  color: string;
  pokedexNumber: string;
  stats: Stats[];
  weight: number;
  weightFormatted: string;
  height: number;
  heightFormatted: string;
  abilities: Ability[];

  constructor(pokemon: any) {
    this.name = pokemon.name;
    this.number = pokemon.id;
    this.image = pokemon.sprites.other['official-artwork'].front_default;
    this.imageHome = pokemon.sprites.other['home'].front_default;
    this.imageDreamWorld = pokemon.sprites.other['dream_world'].front_default;
    this.types = this.formatType(pokemon.types);
    this.color = this.getColor();
    this.pokedexNumber = this.formatPokedexNumber();
    this.stats = this.formatStats(pokemon.stats);
    this.weight = pokemon.weight / 10;
    this.weightFormatted = `${pokemon.weight / 10} kg`;
    this.height = pokemon.height / 10;
    this.heightFormatted = `${pokemon.height / 10} m`;
    this.abilities = this.formatAbilities(pokemon.abilities);
  }

  private formatAbilities(abilities: any[]) {
    const abilitiesFormatted: Ability[] = [];

    abilities.map((ability) => {
      abilitiesFormatted.push({
        isHidden: ability.isHidden,
        slot: ability.slot,
        name: ability.ability.name,
      });
    });

    return abilitiesFormatted;
  }

  private formatStats(stats: any[]) {
    const statsFormatted: Stats[] = [];
    stats.map((stat) => {
      statsFormatted.push({
        name: stat.stat.name,
        valueBase: stat.base_stat,
        effort: stat.effort,
      });
    });
    return statsFormatted;
  }

  private formatType(types: any[]) {
    const typesFormatted: Type[] = [];

    types.map((type) => {
      typesFormatted.push({
        name: type.type.name,
        slot: type.slot,
      });
    });

    return typesFormatted;
  }

  private formatPokedexNumber() {
    if (this.number < 10) {
      return `#00${this.number}`;
    } else if (this.number < 100) {
      return `#0${this.number}`;
    } else {
      return `#${this.number}`;
    }
  }

  private getColor() {
    const typeName: string = this.types[0].name;

    switch (typeName) {
      case 'normal':
        return '#A8A77A';
      case 'fire':
        return '#EE8130';
      case 'water':
        return '#6390F0';
      case 'electric':
        return '#F7D02C';
      case 'grass':
        return '#7AC74C';
      case 'ice':
        return '#96D9D6';
      case 'fighting':
        return '#C22E28';
      case 'poison':
        return '#A33EA1';
      case 'ground':
        return '#E2BF65';
      case 'flying':
        return '#A98FF3';
      case 'psychic':
        return '#F95587';
      case 'bug':
        return '#A6B91A';
      case 'rock':
        return '#B6A136';
      case 'ghost':
        return '#735797';
      case 'dragon':
        return '#6F35FC';
      case 'dark':
        return '#705746';
      case 'steel':
        return '#B7B7CE';
      case 'fairy':
        return '#D685AD';

      default:
        return '#777';
    }
  }
}
interface Type {
  slot: number;
  name: string;
}
interface Stats {
  name: string;
  valueBase: number;
  effort: number;
}

interface Ability {
  name: string;
  isHidden: boolean;
  slot: number;
}
