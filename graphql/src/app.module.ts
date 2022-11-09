import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: false,
      playground: true,
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
    }),
    PokemonModule,
  ],
})
export class AppModule {}
