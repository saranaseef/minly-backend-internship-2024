import { MigrationInterface, QueryRunner } from "typeorm";

export class Director1720959678536 implements MigrationInterface {
    name = 'Director1720959678536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."director_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "director" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "bio" character varying NOT NULL, "gender" "public"."director_gender_enum", "nationality" character varying NOT NULL, "pictue" character varying NOT NULL, "numberOfAwards" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8a269c0bd9db53589a117414527" PRIMARY KEY ("uuid", "id"))`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_9fb5b27579ee465fa6c03dc09c9"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_476c2d437396d614280b60f082a" PRIMARY KEY ("uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_476c2d437396d614280b60f082a"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_29aecf3be13b7eb453421669f27" PRIMARY KEY ("uuid", "id")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "poster" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "Avgrating" numeric(3,1) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "releaseYear" integer`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "trailer" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorId" integer`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_b88380f669a01ae07d1839cc449" FOREIGN KEY ("directorUuid", "directorId") REFERENCES "director"("uuid","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_b88380f669a01ae07d1839cc449"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorUuid"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "trailer"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "releaseYear"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "Avgrating"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "poster"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_476c2d437396d614280b60f082a" PRIMARY KEY ("uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_476c2d437396d614280b60f082a"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "releaseDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "rating" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "movieId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_9fb5b27579ee465fa6c03dc09c9" PRIMARY KEY ("movieId")`);
        await queryRunner.query(`DROP TABLE "director"`);
        await queryRunner.query(`DROP TYPE "public"."director_gender_enum"`);
    }

}
