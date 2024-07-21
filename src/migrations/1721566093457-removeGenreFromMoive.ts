import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveGenreFromMoive1721566093457 implements MigrationInterface {
    name = 'RemoveGenreFromMoive1721566093457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genre"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "genre" character varying`);
    }

}
