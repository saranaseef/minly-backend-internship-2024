import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '../entity/movie.entity';
import { Director } from '../entity/director.entity';
import { Actor } from '../entity/actor.entity';
import { Festival } from '../entity/festival.entity';


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Festival)
    private readonly festivalRepository: Repository<Festival>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { directorId, actorIds, festivalIds, ...movieData } = createMovieDto;

    const director = directorId
    ? await this.directorRepository.findOne({ where: { id: +directorId } })
    : null;

    const actors = actorIds && actorIds.length
      ? await this.actorRepository.findByIds(actorIds)
      : [];

    const festivals = festivalIds && festivalIds.length
      ? await this.festivalRepository.findByIds(festivalIds)
      : [];

    const movie = this.movieRepository.create({
      ...movieData,
      director,
      actors,
      festivals,
    });

    return this.movieRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['director', 'actors', 'festivals'] });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director', 'actors', 'festivals'] });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> { 
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['director', 'actors', 'festivals'] });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    const { directorId, actorIds, festivalIds, ...movieData } = updateMovieDto;

    if (directorId) {
      const director = await this.directorRepository.findOne({ where: { id: +directorId } });
      movie.director = director;
    }

    if (actorIds) {
      const actors = await this.actorRepository.findByIds(actorIds);
      movie.actors = actors;
    }

    if (festivalIds) {
      const festivals = await this.festivalRepository.findByIds(festivalIds);
      movie.festivals = festivals;
    }

    Object.assign(movie, movieData);

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> { 
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    await this.movieRepository.remove(movie);
  }
}
