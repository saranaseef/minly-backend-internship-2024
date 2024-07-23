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


  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['characters', 'awards'], 
    });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    return actor;
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const actor = await this.actorRepository.findOne({ where: { id } });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    Object.assign(actor, updateActorDto);
    return this.actorRepository.save(actor);
  }

  async remove(id: number): Promise<void> {
    const actor = await this.actorRepository.findOne({ where: { id } });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }
    await this.actorRepository.remove(actor);
  }
}
