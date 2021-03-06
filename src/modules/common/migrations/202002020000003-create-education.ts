export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TABLE "educations" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "institution" VARCHAR(100) NOT NULL,
          "degree" VARCHAR(10) NOT NULL,
          "course" VARCHAR(30) NOT NULL,
          "description" VARCHAR(500) NOT NULL,
          "startDate" DATE NOT NULL DEFAULT CURRENT_DATE,
          "endDate" DATE DEFAULT CURRENT_DATE,
          "profileId" INTEGER REFERENCES profiles(id),
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table educations created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`DROP TABLE educations;`);
}
