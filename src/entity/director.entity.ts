import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Timestamp, OneToMany } from 'typeorm';
import { Movie } from "./movie.entity"
import { Gender } from './gender.enum';

@Entity()
export class Director{

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
    pictue: string; 

    @Column()
    numberOfAwards: string; 

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; 
    
    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 

    @OneToMany(() => Movie, (movie) => movie.director)
    movies: Movie[];
}