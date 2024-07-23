import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Movie } from '../entity/movie.entity';
import { Genre } from '../entity/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Movie])],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
