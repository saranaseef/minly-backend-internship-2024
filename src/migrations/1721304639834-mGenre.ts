import { MigrationInterface, QueryRunner } from "typeorm";

export class MGenre1721304639834 implements MigrationInterface {
    name = 'MGenre1721304639834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_genre" ("movie_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_1c071b49bad73713e18e774795e" PRIMARY KEY ("movie_id", "genre_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff1bda1a663d0de5974851fa53" ON "movie_genre" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e84764c059f38c3f9d99d2e5de" ON "movie_genre" ("genre_id") `);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_ff1bda1a663d0de5974851fa53a" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_e84764c059f38c3f9d99d2e5de9" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_e84764c059f38c3f9d99d2e5de9"`);
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_ff1bda1a663d0de5974851fa53a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e84764c059f38c3f9d99d2e5de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff1bda1a663d0de5974851fa53"`);
        await queryRunner.query(`DROP TABLE "movie_genre"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
