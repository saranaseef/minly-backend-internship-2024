import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movie.entity';
import { Genre } from '../entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genre);
  }

  findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.findOne(id);
    Object.assign(genre, updateGenreDto);
    return this.genreRepository.save(genre);
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    await this.genreRepository.remove(genre);
  }

  async findGenresByMovieId(movieId: number): Promise<Genre[]> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['genres'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }
    return movie.genres;
  }

  async findMoviesByGenre(genreId: number): Promise<Movie[]> {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
      relations: ['movies'],
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    }
    return genre.movies;
  }
}
