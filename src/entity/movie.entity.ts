import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, Generated } from 'typeorm';
import { Director } from './director.entity';
import { Actor } from './actor.entity';
import { Festival } from './festival.entity'; 
import { Genre } from './genre.entity';
import { Character } from './character.entity';
import { Award } from './awards.entity'; 

@Entity()
@Unique(['id', 'uuid'])
export class Movie {

    @Column('uuid')
    @Generated()
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

    @Column({ nullable: true })
    overview: string;

    @Column({ nullable: true })
    writer: string;

    @Column({ nullable: true })
    language: string;

    @Column({ nullable: true })
    duration: string;

    @ManyToMany(() => Festival, (festival) => festival.movies)
    @JoinTable({
      name: 'movie_festival',
      joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'festival_id', referencedColumnName: 'id' }
    })
    festivals: Festival[];

    @ManyToMany(() => Genre, (genre) => genre.movies)
    @JoinTable({
      name: 'movie_genre',
      joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: Genre[];

  @OneToMany(() => Character, character => character.movie)
  characters: Character[];

  @OneToMany(() => Award, (award) => award.movie)
  awards: Award[];
}