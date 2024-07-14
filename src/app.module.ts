import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entity/movie.entity';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
