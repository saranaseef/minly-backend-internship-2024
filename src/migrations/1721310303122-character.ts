import { MigrationInterface, QueryRunner } from "typeorm";

export class Character1721310303122 implements MigrationInterface {
    name = 'Character1721310303122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "character" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "actorId" integer, "movieId" integer, CONSTRAINT "PK_6726d24eeb179a68371c1407976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_3de33c15a50b7f8fd6c244de2ef" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_a9d97448490a3f5a844f7bd0e10" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_a9d97448490a3f5a844f7bd0e10"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_3de33c15a50b7f8fd6c244de2ef"`);
        await queryRunner.query(`DROP TABLE "character"`);
    }    

}
