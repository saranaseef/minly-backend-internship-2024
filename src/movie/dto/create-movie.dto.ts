import { IsString, IsNumber, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsNumber()
  avgRating: number;

  @IsOptional()
  @IsNumber()
  releaseYear?: number;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @IsUUID()
  directorId?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  actorIds: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  festivalIds: string[];
}
