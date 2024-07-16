import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from '../entity/movie.entity';
import { Director } from '../entity/director.entity';
import { Actor } from '../entity/actor.entity';
import { Festival } from '../entity/festival.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Director, Actor, Festival])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
