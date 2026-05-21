#!/bin/sh
set -e

# Use environment variables with fallbacks
DB_HOST="${MYSQL_HOST:-db}"
DB_PORT="${MYSQL_PORT:-3306}"

echo "Waiting for database port to open at $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Database port is closed. Retrying in 2 seconds..."
  sleep 2
done
echo "Database port is open!"

# Run prisma db push in a loop in case the port is open but MariaDB is still starting up
echo "Synchronizing database schema with Prisma..."
until npx prisma db push --accept-data-loss; do
  echo "Prisma db push failed (MariaDB might still be initializing). Retrying in 3 seconds..."
  sleep 3
done
echo "Database schema synchronized successfully!"

# Seed database
echo "Seeding the database..."
node prisma/seed.js || echo "Seeding failed or already done, continuing..."

# Start the application
echo "Starting Next.js application..."
exec npm run start
