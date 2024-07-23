import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from '../entity/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  async findAll(): Promise<Actor[]> {
    return this.actorRepository.find();
  }

  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['characters', 'awards', 'characters.movie'],
    });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    return actor;
  }

  async update(id: number, updateActorDto: Partial<UpdateActorDto>): Promise<Actor> {
    const actor = await this.actorRepository.preload({
      id,
      ...updateActorDto,
    });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    return this.actorRepository.save(actor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.actorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
  }
}
