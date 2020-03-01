#! /usr/bin/env

function install_dependencies {
  echo ">>>>>>>>>>>>>>>>>>>Install Yarn"
  curl -o- -L https://yarnpkg.com/install.sh | bash
  echo ">>>>>>>>>>>>>>>>>>>Install Typescript"
  yarn global add ts-node
  yarn global add typescript
  echo ">>>>>>>>>>>>>>>>>>>Install Dependencies"
  yarn install
}

function prep_env_variables {
  echo ">>>>>>>>>>>>>>>>>>>Prepare environment variables"
  cat <<EoF > ~/repo/.env
DB_HOST=${DB_HOST}
FRONTEND_URL=${FRONTEND_URL}
DB_PORT=${DB_PORT}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DB_NAME=${DB_PASS}
JWT_SECRET=${JWT_SECRET}
MAIL_HOST=${MAIL_HOST}
MAIL_PORT=${MAIL_PORT}
EMAIL=${MAIL_ADDRESS}
PASSWORD=${MAIL_PASSWORD}
EoF
}

function run_migration {
  yarn run migrate up
}

function main {
  install_dependencies
  prep_env_variables
  run_migration
}

main