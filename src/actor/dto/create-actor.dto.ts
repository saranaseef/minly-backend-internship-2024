import { Gender } from "src/entity/gender.enum";

export class CreateActorDto {
    firstName: string;
    lastName: string;
    birthDate: Date;
    bio: string;
    gender: Gender; 
    nationality: string;
    picture: string;
    numberOfAwards: string;
    reviews?: number;
    rating?: number;
    placeOfBirth?: string;
  }
  
    