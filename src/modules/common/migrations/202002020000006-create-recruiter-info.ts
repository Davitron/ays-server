export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TABLE "recruiter_info" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "company" VARCHAR(50) NOT NULL,
          "position" VARCHAR(50) NOT NULL,
          "address" VARCHAR(100) NOT NULL,
          "website" VARCHAR(100),
          "referer" VARCHAR(30) NOT NULL,
          "phoneNumber" VARCHAR(15) NOT NULL,
          "profileId" INTEGER REFERENCES profiles(id),
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table recruiter_info created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`DROP TABLE recruiter_info;`);
}
