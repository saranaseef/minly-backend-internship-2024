import { MigrationInterface, QueryRunner } from "typeorm";

export class Awards1721555588247 implements MigrationInterface {
    name = 'Awards1721555588247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "award" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "actorStatus" character varying NOT NULL, "movieTitle" character varying NOT NULL,  "actorId" integer,  "movieId" integer, CONSTRAINT "PK_e887e4e69663925ebb60d3a7775" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "character" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "PK_6726d24eeb179a68371c1407976"`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "PK_6726d24eeb179a68371c1407976" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "reviews" integer`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "rating" numeric(2,1)`);
        await queryRunner.query(`ALTER TABLE "actor" ADD "placeOfBirth" character varying`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "UQ_6c4aec48c564968be15078b8ae5" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_fe6b04610483c8e61163043e1a4" FOREIGN KEY ( "actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_54b0c86051998cb1404e01b9153" FOREIGN KEY ( "movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_54b0c86051998cb1404e01b9153"`);
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_fe6b04610483c8e61163043e1a4"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "UQ_6c4aec48c564968be15078b8ae5"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "placeOfBirth"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "reviews"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "PK_6726d24eeb179a68371c1407976"`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "PK_6726d24eeb179a68371c1407976" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "uuid"`);
        await queryRunner.query(`DROP TABLE "award"`);
    }

}
