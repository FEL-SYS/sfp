import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1641058463141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users(firstname varchar(128))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE users");
  }
}
