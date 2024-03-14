#!/bin/bash

$ENV_FILE
$IP_ADDRESS
PORT="8090"
FLAG=$1

# search environments folder to save ip address
ENV_DIR=$(find . -maxdepth 3 -type d -name "environments" -not -path "*/node_modules/*" | head -n 1)

if [[ -n "$ENV_DIR" ]]; then
  ENV_FILE="$ENV_DIR/environment.development.ts"
else
  echo "Error: 'environments' directory not found within 3 levels down from root directory."
  exit 1
fi

if [[ "$FLAG" == "--host" ]]; then
  IP_ADDRESS=$(hostname -I | awk '{print $1}')
else
  IP_ADDRESS="localhost"
fi

# save that IP address in environment file
echo -e "export const environment = {\n  baseURL: 'http://$IP_ADDRESS:$PORT',\n};" > "$ENV_FILE"

# run backend server and database
./backend/pb serve --http="$IP_ADDRESS:$PORT"