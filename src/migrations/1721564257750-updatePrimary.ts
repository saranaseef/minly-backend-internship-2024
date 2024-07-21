import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePrimary1721564257750 implements MigrationInterface {
    name = 'UpdatePrimary1721564257750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_3de33c15a50b7f8fd6c244de2ef"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_a9d97448490a3f5a844f7bd0e10"`);
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_54b0c86051998cb1404e01b9153"`);
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_fe6b04610483c8e61163043e1a4"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_b88380f669a01ae07d1839cc449"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorUuid"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "PK_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "UQ_6c4aec48c564968be15078b8ae5"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "PK_c9a30ff2bf47bdda454eb8bad4f"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d9db9c773c7b818622228d9fab"`);
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_ff1bda1a663d0de5974851fa53a"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "UQ_8a269c0bd9db53589a117414527" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "UQ_6726d24eeb179a68371c1407976" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "UQ_c9a30ff2bf47bdda454eb8bad4f" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_29aecf3be13b7eb453421669f27" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_ea0da401dc81fcae713dc49f35d" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_3529e8bc9875601a6ef72f77438" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_0a90b9fcd4579905aa95a5b0588" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_da9802d6fca0a8606c97b899ed3" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d9db9c773c7b818622228d9fab" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_ff1bda1a663d0de5974851fa53a" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_ff1bda1a663d0de5974851fa53a"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d9db9c773c7b818622228d9fab"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_475e8562aad43168679b898ff56"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`);
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_da9802d6fca0a8606c97b899ed3"`);
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_0a90b9fcd4579905aa95a5b0588"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_3529e8bc9875601a6ef72f77438"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_ea0da401dc81fcae713dc49f35d"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "UQ_c9a30ff2bf47bdda454eb8bad4f"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "UQ_6726d24eeb179a68371c1407976"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "UQ_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_29aecf3be13b7eb453421669f27" PRIMARY KEY ("uuid", "id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_3315be503ed4c23e4c12c2aba55" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_ff1bda1a663d0de5974851fa53a" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d9db9c773c7b818622228d9fab" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "PK_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "PK_c9a30ff2bf47bdda454eb8bad4f" PRIMARY KEY ("uuid", "id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_475e8562aad43168679b898ff56" FOREIGN KEY ("actor_id") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "UQ_6c4aec48c564968be15078b8ae5" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "PK_b85b179882f31c43324ef124fea"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "PK_8a269c0bd9db53589a117414527" PRIMARY KEY ("uuid", "id")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_b88380f669a01ae07d1839cc449" FOREIGN KEY ("directorUuid", "directorId") REFERENCES "director"("uuid","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_fe6b04610483c8e61163043e1a4" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_54b0c86051998cb1404e01b9153" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_a9d97448490a3f5a844f7bd0e10" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_3de33c15a50b7f8fd6c244de2ef" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
