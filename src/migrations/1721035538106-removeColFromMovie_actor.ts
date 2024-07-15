import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColFromMovieActor1721035538106 implements MigrationInterface {
    name = 'RemoveColFromMovieActor1721035538106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_79f95edca0d8730aadc44cc5d92"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_5b89215255a9dd9ed06cea862bc"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actorUuid"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movieUuid"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movieUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movieId" integer`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actorUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actorId" integer`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_5b89215255a9dd9ed06cea862bc" FOREIGN KEY ("movieUuid", "movieId") REFERENCES "movie"("uuid","id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_79f95edca0d8730aadc44cc5d92" FOREIGN KEY ("actorUuid", "actorId") REFERENCES "actor"("uuid","id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
