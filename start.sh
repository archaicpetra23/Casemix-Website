#!/bin/bash
echo "=================================================="
echo " Starting Casemix RS Server & Cloudflare Tunnel   "
echo "=================================================="

# Start Docker containers in the background
sudo docker-compose up -d

echo ""
echo "Server is starting in the background!"
echo "-> Local Access: http://localhost:3000"
echo ""
echo "Starting Cloudflare Tunnel..."
echo "Wait a few seconds for the public URL to appear below."
echo "Look for a line ending with '.trycloudflare.com'."
echo "--------------------------------------------------"
echo "Press Ctrl+C to stop BOTH the tunnel and the Docker containers."
echo "=================================================="

# Stop docker containers on script exit (Ctrl+C)
trap 'echo -e "\nStopping containers..."; sudo docker-compose down; exit' INT

# Run cloudflared in the foreground
cloudflared tunnel --url http://localhost:3000
