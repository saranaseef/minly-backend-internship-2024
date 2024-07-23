import { MigrationInterface, QueryRunner } from "typeorm";

export class Festival1720965955411 implements MigrationInterface {
    name = 'Festival1720965955411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_5b89215255a9dd9ed06cea862bc"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_79f95edca0d8730aadc44cc5d92"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3315be503ed4c23e4c12c2aba5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_475e8562aad43168679b898ff5"`);
        await queryRunner.query(`CREATE TABLE "festival" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_f1bcb856ab1c89180702ea0b47c" UNIQUE ("id"), CONSTRAINT "PK_a5f7630f57387010dee7389bc96" PRIMARY KEY ("uuid", "id"))`);
        await queryRunner.query(`CREATE TABLE "movie_festival" ("movie_id" integer NOT NULL, "festival_id" integer NOT NULL, CONSTRAINT "PK_d991c68dd9bd2b74153cf1d8162" PRIMARY KEY ("movie_id", "festival_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d9db9c773c7b818622228d9fa" ON "movie_festival" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2088304eddeef47464254284c7" ON "movie_festival" ("festival_id") `);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_57f7ec79e5080ab66c02e776832"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_475e8562aad43168679b898ff56" PRIMARY KEY ("actor_id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movie_id"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actor_id"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movieUuid"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actorUuid"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movieUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movieId" integer`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actorUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actorId" integer`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movie_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_7c13bb438c45e44bfb480560545" PRIMARY KEY ("id", "movie_id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actor_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_7c13bb438c45e44bfb480560545"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99" PRIMARY KEY ("id", "movie_id", "actor_id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_57f7ec79e5080ab66c02e776832" PRIMARY KEY ("movie_id", "actor_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_3315be503ed4c23e4c12c2aba5" ON "movie_actor" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_475e8562aad43168679b898ff5" ON "movie_actor" ("actor_id") `);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_5b89215255a9dd9ed06cea862bc" FOREIGN KEY ("movieUuid", "movieId") REFERENCES "movie"("uuid","id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_79f95edca0d8730aadc44cc5d92" FOREIGN KEY ("actorUuid", "actorId") REFERENCES "actor"("uuid","id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d9db9c773c7b818622228d9fab" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_2088304eddeef47464254284c7b" FOREIGN KEY ("festival_id") REFERENCES "festival"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_2088304eddeef47464254284c7b"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d9db9c773c7b818622228d9fab"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_79f95edca0d8730aadc44cc5d92"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_5b89215255a9dd9ed06cea862bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_475e8562aad43168679b898ff5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3315be503ed4c23e4c12c2aba5"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_57f7ec79e5080ab66c02e776832"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99" PRIMARY KEY ("id", "movie_id", "actor_id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_1ea66fb5419cdf303ac7240ec99"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_7c13bb438c45e44bfb480560545" PRIMARY KEY ("id", "movie_id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actor_id"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_7c13bb438c45e44bfb480560545"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movie_id"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actorId"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "actorUuid"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "movieUuid"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_c578a5152d4c32b9ad0bfa7c867"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actorId" integer`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actorUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movieId" integer`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movieUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "actor_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_475e8562aad43168679b898ff56" PRIMARY KEY ("actor_id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD "movie_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "PK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "PK_57f7ec79e5080ab66c02e776832" PRIMARY KEY ("movie_id", "actor_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2088304eddeef47464254284c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d9db9c773c7b818622228d9fa"`);
        await queryRunner.query(`DROP TABLE "movie_festival"`);
        await queryRunner.query(`DROP TABLE "festival"`);
        await queryRunner.query(`CREATE INDEX "IDX_475e8562aad43168679b898ff5" ON "movie_actor" ("actor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3315be503ed4c23e4c12c2aba5" ON "movie_actor" ("movie_id") `);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_79f95edca0d8730aadc44cc5d92" FOREIGN KEY ("actorUuid", "actorId") REFERENCES "actor"("uuid","id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_5b89215255a9dd9ed06cea862bc" FOREIGN KEY ("movieUuid", "movieId") REFERENCES "movie"("uuid","id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
