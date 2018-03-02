#! /bin/bash

echo "Starting application"

docker build \
  -t "sydney" \
  -f Dockerfile .

docker run \
  -e "NODE_ENV=production" \
  -m "500M" --memory-swap "1G" \
  -p "3000:3000" \
  sydney
