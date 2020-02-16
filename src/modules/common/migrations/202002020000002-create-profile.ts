export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TABLE "profiles" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "firstName" VARCHAR(30) NOT NULL,
          "lastName" VARCHAR(30) NOT NULL,
          "title" VARCHAR(30),
          "country" VARCHAR(30),
          "state" VARCHAR(30),
          "phoneNumber" VARCHAR(30),
          "profileViews" INTEGER NOT NULL,
          "profilePic" VARCHAR(50),
          "userId" INTEGER REFERENCES users(id),
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table profiles created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`DROP TABLE profiles;`);
}
