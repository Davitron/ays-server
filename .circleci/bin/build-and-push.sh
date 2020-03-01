#! /usr/bin/env

FULL_IMAGE_NAME="${AWS_ECR_ACCOUNT_URL}/${AWS_REPO_NAME}:latest"

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

function install_aws_cli {
  cd ~
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  sudo apt-get update
  sudo apt install -y groff
}

function build_docker_image {
  cd ~/repo
  docker build -f ./docker/api/Dockerfile -t ${FULL_IMAGE_NAME} .
  aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ECR_ACCOUNT_URL
  docker push ${FULL_IMAGE_NAME}
}

function main {
  prep_env_variables
  install_aws_cli
  build_docker_image
}

main