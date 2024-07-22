import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieDetails1721302510895 implements MigrationInterface {
    name = 'MovieDetails1721302510895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "writer" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "language" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "duration" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "genre" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "writer"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
    }

}
