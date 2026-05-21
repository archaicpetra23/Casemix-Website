#!/bin/bash
echo "=================================================="
echo " Stopping Casemix RS Server (Docker Compose) "
echo "=================================================="

# Stop Docker containers
sudo docker-compose down

echo ""
echo "Server stopped successfully!"
echo "=================================================="
