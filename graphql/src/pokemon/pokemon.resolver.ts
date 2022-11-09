import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import Pokemon from './models/pokemon.model';

@Resolver('Pokemon')
export class PokemonResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query()
  async getPokemons(
    @Args('offset', ParseIntPipe) offset = 0,
    @Args('limit', ParseIntPipe) limit = 10,
  ) {
    const pokemons: any[] = [];
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      ),
    );

    for (const pokemon of data.results) {
      const { data: pkmData } = await firstValueFrom(
        this.httpService.get(pokemon?.url),
      );
      const { data: pkmInfoData } = await firstValueFrom(
        this.httpService.get(pkmData?.species?.url),
      );
      pokemons.push(new Pokemon({ ...pkmData, infos: pkmInfoData }));
    }
    return pokemons;
  }

  @Query('pokemon')
  async findOnePokemon(@Args('name') name: string) {
    console.log(name);
    const { data } = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    );

    const { data: pkmInfoData } = await firstValueFrom(
      this.httpService.get(data?.species?.url),
    );
    const pokemon = new Pokemon({ ...data, infos: pkmInfoData });

    return pokemon;
  }
}
