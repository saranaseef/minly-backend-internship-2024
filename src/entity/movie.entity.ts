import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Timestamp, ManyToMany, OneToMany } from 'typeorm';
import { Director } from './director.entity'; 

@Entity()
export class Movie {
  
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column(({ nullable: true }))
    poster: string;

    @Column('decimal', { precision: 3, scale: 1 })
    Avgrating: number;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; 
    
    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 

    @Column(({ nullable: true }))
    releaseYear: number;

    @Column(({ nullable: true }))
    trailer: string;

    @ManyToOne(() => Director, (director) => director.movies, { nullable: true })
    director: Director;

    @Column({ nullable: true })
    directorId: number;

}

