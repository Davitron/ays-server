export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TYPE employmentType AS ENUM ('FULLTIME', 'CONTRACT');
      CREATE TABLE "jobs" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "title" VARCHAR(30) NOT NULL,
          "location" VARCHAR(30) NOT NULL,
          "type" employmentType NOT NULL,
          "description" VARCHAR(1000) NOT NULL,
          "address" VARCHAR(30) NOT NULL,
          "motivation" VARCHAR(150) NOT NULL,
          "benefits" TEXT[],
          "minCompensation" INTEGER NOT NULL,
          "maxCompensation" INTEGER NOT NULL,
          "employerId" INTEGER REFERENCES profiles(id) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table jobs created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`DROP TABLE jobs;`);
  sequelize.query(`DROP TYPE employmentType;`);
}
