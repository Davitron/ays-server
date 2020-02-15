export async function up(sequelize) {
  // language=PostgreSQL
  sequelize.query(`
      CREATE TABLE "certifications" (
          "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
          "organization" VARCHAR(50) NOT NULL,
          "title" VARCHAR(50) NOT NULL,
          "linkToDoc" VARCHAR(50) NOT NULL,
          "description" VARCHAR(500) NOT NULL,
          "issueDate" DATE NOT NULL DEFAULT CURRENT_DATE,
          "expiryDate" DATE NOT NULL DEFAULT CURRENT_DATE,
          "profileId" INTEGER REFERENCES profiles(id),
          "createdAt" TIMESTAMP NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL
      );
  `);
  // tslint:disable-next-line: no-console
  console.log('*Table certifications created!*');
}

export async function down(sequelize) {
  // language=PostgreSQL
  sequelize.query(`DROP TABLE certifications;`);
}
