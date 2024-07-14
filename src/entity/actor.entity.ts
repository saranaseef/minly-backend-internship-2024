import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Gender } from './gender.enum';
import { Movie } from './movie.entity';

@Entity()
@Unique(['id'])
export class Actor {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: Date;

    @Column()
    bio: string;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true,
    })
    gender: Gender;

    @Column()
    nationality: string;

    @Column()
    picture: string;

    @Column()
    numberOfAwards: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToMany(() => Movie, (movie) => movie.actors)
    movies: Movie[];
}
