import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query('filter') filter: string, 
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.movieService.findAll(filter, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }

  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.movieService.search(query, page, limit);
  }

  @Get('genre/:genreId')
  findByGenre(
    @Param('genreId') genreId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.movieService.findByGenre(genreId, page, limit);
  }
}
