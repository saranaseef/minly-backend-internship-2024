import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1720431643903 implements MigrationInterface {
    name = 'Initial1720431643903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("movieId" SERIAL NOT NULL, "rating" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_9fb5b27579ee465fa6c03dc09c9" PRIMARY KEY ("movieId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
