import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entity/movie.entity';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { DirectorModule } from './director/director.module';
import { FestivalModule } from './festival/festival.module';
import { GenreModule } from './genre/genre.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature([
      Movie,
    ]),
    MovieModule,
    ActorModule,
    DirectorModule,
    FestivalModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
