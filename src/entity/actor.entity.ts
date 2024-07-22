import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, Generated } from 'typeorm';
import { Gender } from './gender.enum';
import { Movie } from './movie.entity';
import { Character } from './character.entity';
import { Award } from './awards.entity';

@Entity()
@Unique(['id', 'uuid'])
export class Actor {

    @Column('uuid')
    @Generated('uuid')
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

    @Column({ nullable: true })
    reviews: number;

    @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
    rating: number; 

    @Column({ nullable: true })
    placeOfBirth: string; 

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToMany(() => Movie, (movie) => movie.actors)
    movies: Movie[];

    @OneToMany(() => Character, character => character.actor)
    characters: Character[];

    @OneToMany(() => Award, award => award.actor)
    awards: Award[]; 
}
