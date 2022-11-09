import { PokemonService } from './pokemon.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get()
  getAllPokemons(@Query() query: { offset: string }) {
    if (query.offset === undefined) {
      query.offset = '0';
    }
    return this.service.findAll(parseInt(query?.offset));
  }
}
