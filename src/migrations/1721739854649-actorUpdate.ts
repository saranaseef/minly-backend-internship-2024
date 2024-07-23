import { MigrationInterface, QueryRunner } from "typeorm";

export class ActorUpdate1721739854649 implements MigrationInterface {
    name = 'ActorUpdate1721739854649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" ADD "knownFor" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" DROP COLUMN "knownFor"`);
    }

}
