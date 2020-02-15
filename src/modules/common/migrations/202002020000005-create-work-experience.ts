export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TABLE "work_experience" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "company" VARCHAR(30) NOT NULL,
          "position" VARCHAR(30) NOT NULL,
          "description" VARCHAR(500) NOT NULL,
          "startDate" DATE NOT NULL DEFAULT CURRENT_DATE,
          "endDate" DATE NOT NULL DEFAULT CURRENT_DATE,
          "profileId" INTEGER REFERENCES profiles(id),
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table work_experience created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`DROP TABLE work_experience;`);
}
