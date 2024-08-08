import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '../entity/movie.entity';
import { Director } from '../entity/director.entity';
import { Actor } from '../entity/actor.entity';
import { Festival } from '../entity/festival.entity';
import { Character } from '../entity/character.entity';
import { Genre } from '../entity/genre.entity';

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
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { directorId, actorIds, festivalIds, genreIds, ...movieData } = createMovieDto;

    const director = directorId ? await this.directorRepository.findOne({ where: { id: +directorId } }) : null;
    const actors = actorIds && actorIds.length ? await this.actorRepository.find({ where: { id: In(actorIds) } }) : [];
    const festivals = festivalIds && festivalIds.length ? await this.festivalRepository.find({ where: { id: In(festivalIds) } }) : [];
    const genres = genreIds && genreIds.length ? await this.genreRepository.find({ where: { id: In(genreIds) } }) : [];

    const movie = this.movieRepository.create({
      ...movieData,
      director,
    });

    movie.characters = actors.map(actor => {
      const character = new Character();
      character.actor = actor;
      return character;
    });

    movie.festivals = festivals;
    movie.genres = genres;

    return this.movieRepository.save(movie);
  }

  async findAll(filter: string, page: number, limit: number, genre?: string): Promise<{ data: Movie[]; total: number }> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .leftJoinAndSelect('movie.characters', 'character')
      .leftJoinAndSelect('character.actor', 'actor');

    if (filter === 'date') {
      queryBuilder.orderBy('movie.releaseYear', 'DESC');
    } else if (filter === 'rating') {
      queryBuilder.orderBy('movie.avgRating', 'DESC');
    }

    if (genre) {
      queryBuilder.andWhere('genre.name = :genre', { genre });
    }

    const total = await queryBuilder.getCount();

    const movies = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { data: movies, total };
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ 
      where: { id }, 
      relations: {
        director: true,
        festivals: true,
        genres: true,
        characters: {
          actor: true,
        },
      },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> { 
    const movie = await this.movieRepository.findOne({ 
      where: { id }, 
      relations: {
        director: true,
        festivals: true,
        genres: true,
        characters: {
          actor: true,
        },
      },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    const { directorId, actorIds, festivalIds, genreIds, characterIds, ...movieData } = updateMovieDto;

    if (directorId) {
      const director = await this.directorRepository.findOne({ where: { id: +directorId } });
      movie.director = director;
    }

    if (actorIds) {
      const actors = await this.actorRepository.find({ where: { id: In(actorIds) } });
      movie.characters = actors.map(actor => {
        const character = new Character();
        character.actor = actor;
        return character;
      });
    }

    if (festivalIds) {
      const festivals = await this.festivalRepository.find({ where: { id: In(festivalIds) } });
      movie.festivals = festivals;
    }

    if (genreIds) {
      const genres = await this.genreRepository.find({ where: { id: In(genreIds) } });
      movie.genres = genres;
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

  async search(query: string, page: number, limit: number): Promise<{ data: Movie[]; total: number }> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    if (query) {
      queryBuilder.where('LOWER(movie.title) LIKE LOWER(:query)', { query: `%${query}%` });
    }

    const total = await queryBuilder.getCount();

    const movies = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .leftJoinAndSelect('movie.genres', 'genre')
      .leftJoinAndSelect('movie.characters', 'character')
      .leftJoinAndSelect('character.actor', 'actor')
      .getMany();

    return { data: movies, total };
  }

  async findByGenre(genreId: number, page: number, limit: number): Promise<{ data: Movie[]; total: number }> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.genres', 'genre', 'genre.id = :genreId', { genreId })
      .leftJoinAndSelect('movie.characters', 'character')
      .leftJoinAndSelect('character.actor', 'actor');

    const total = await queryBuilder.getCount();

    const movies = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { data: movies, total };
  }
}
