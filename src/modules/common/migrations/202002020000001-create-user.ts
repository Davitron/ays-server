export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TYPE role AS ENUM ('JOBSEEKER', 'RECRUITER', 'ADMIN');
      CREATE TABLE "users" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "email" VARCHAR(100) UNIQUE NOT NULL,
          "role" role NOT NULL,
          "password" TEXT NOT NULL,
          "isVerified" BOOLEAN NOT NULL,
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table users created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
  DROP TABLE users;
  DROP TYPE role;
  `);
}
