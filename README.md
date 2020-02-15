# AYS-SERVER


## Project Set-Up

### Requirements

- PostgreSQL
- Node
- Yarn
- NestJS-CLI

### Setup
- #### Clone Repository
- #### Create Database
  ```bash
    $ createdb database_name
  ```
- #### Run migration
  ```bash
    $ yarn run migrate up
  ```
- #### Update .env file
  The `.env.sample` file describes the required environment variables for the application to run.
  ```
    DB_HOST      - The database host
    DB_PORT      - The port in which the postgresql database runs
    DB_USER      - The database user
    DB_PASS      - The database password
    DB_NAME      - The database name
    JWT_SECRET   - The secret used to sign the JWT token
    MAIL_HOST    - SMTP host for mailing functionality
    MAIL_PORT    - SMTP password for mailing functionality
    EMAIL        - Email address for mailing functionality
    PASSWORD     - Email password for mailing functionality
    DATABASE_URL - Production database url (Used only when deploying to production)
  ```

- #### Install dependency
```bash
  $ yarn install
```

- #### Start Applicaion
  - In watch mode
    ```bash
      $ yarn run start:dev
    ```
  
  - In defualt mode
    ```bash
      $ yarn start
    ```

### API Documentation
```
  http://localhost:3000/docs
```
