#!/bin/sh

# Exit immediately if any command fails
set -e

echo "Running database migrations..."
yarn prisma migrate deploy

echo "Starting the application..."
exec "$@"
