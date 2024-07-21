import { MigrationInterface, QueryRunner } from "typeorm";

export class DirectorBirthPlace1721564785013 implements MigrationInterface {
    name = 'DirectorBirthPlace1721564785013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" ADD "birthPlace" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT IF EXISTS "PK_movie_uuid"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT IF EXISTS "PK_actor_uuid"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT IF EXISTS "PK_director_uuid"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "birthPlace"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD PRIMARY KEY ("uuid")`);
        await queryRunner.query(`ALTER TABLE "actor" ADD PRIMARY KEY ("uuid")`);
        await queryRunner.query(`ALTER TABLE "director" ADD PRIMARY KEY ("uuid")`);

    }

}
