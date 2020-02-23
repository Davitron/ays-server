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

### APP Documention
```
$ yarn run compodoc
```
