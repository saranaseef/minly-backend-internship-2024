import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Actor } from './actor.entity';
import { Movie } from './movie.entity';

@Entity()
export class Award {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    actorStatus: string;

    @Column()
    movieTitle: string;

    @ManyToOne(() => Actor, (actor) => actor.awards)
    actor: Actor;

    @ManyToOne(() => Movie, (movie) => movie.awards)
    movie: Movie;
}
