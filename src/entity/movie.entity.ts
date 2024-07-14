import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Director } from './director.entity';
import { Actor } from './actor.entity';
import { Festival } from './festival.entity'; 


@Entity()
@Unique(['id'])
export class Movie {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    poster: string;

    @Column('decimal', { precision: 3, scale: 1 })
    avgRating: number;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ nullable: true })
    releaseYear: number;

    @Column({ nullable: true })
    trailer: string;

    @ManyToOne(() => Director, director => director.movies, { nullable: true })
    director: Director;

    @Column({ nullable: true })
    directorId: number;

    @ManyToMany(() => Actor, (actor) => actor.movies)
    @JoinTable({
      name: 'movie_actor',
      joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
    })
    actors: Actor[];
    

    @ManyToMany(() => Festival, (festival) => festival.movies)
    @JoinTable({
      name: 'movie_festival',
      joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'festival_id', referencedColumnName: 'id' }
    })
    festivals: Festival[];

}
