import { Entity, Unique, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
@Unique(['id'])
export class Festival {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; 

    @ManyToMany(() => Movie, (movie) => movie.festivals)
    movies: Movie[];

}