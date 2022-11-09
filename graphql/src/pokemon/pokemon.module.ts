import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonResolver } from './pokemon.resolver';

@Module({
  imports: [HttpModule],
  providers: [PokemonResolver],
})
export class PokemonModule {}
