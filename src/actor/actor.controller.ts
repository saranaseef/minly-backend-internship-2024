import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from '../entity/actor.entity';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  async create(@Body() createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorService.create(createActorDto);
  }

  @Get()
  async findAll(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Actor> {
    return this.actorService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActorDto: UpdateActorDto,
  ): Promise<Actor> {
    return this.actorService.update(id, updateActorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.actorService.remove(id);
  }
}
