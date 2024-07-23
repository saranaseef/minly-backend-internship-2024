import { MigrationInterface, QueryRunner } from "typeorm";

export class AwardUpate1721747392396 implements MigrationInterface {
    name = 'AwardUpate1721747392396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "award" RENAME COLUMN "movieTitle" TO "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "award" RENAME COLUMN "image" TO "movieTitle"`);
    }

}
