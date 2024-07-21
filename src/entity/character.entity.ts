import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, Generated } from 'typeorm';
import { Actor } from './actor.entity';
import { Movie } from './movie.entity';

@Entity()
@Unique(['id', 'uuid'])

export class Character {
  @Column('uuid')
  @Generated('uuid')
  uuid: string;
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Actor, actor => actor.characters)
  actor: Actor;

  @ManyToOne(() => Movie, movie => movie.characters)
  movie: Movie;
}
