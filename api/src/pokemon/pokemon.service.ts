import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import Pokemon from './models/pokemon.model';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(offset = 0): Promise<any> {
    const limit = 24;
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
    const nextOffset = offset + limit;
    return { nextOffset: nextOffset, results: pokemons };
  }
}
