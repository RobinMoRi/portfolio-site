#!/bin/bash

# Function to stop and remove containers based on partial matching of container names
stop_and_remove_containers() {
    # Find containers that match a specific pattern and stop them
    for container in $(docker ps -a --format '{{.Names}}' | grep -w $1); do
        echo "Stopping container: $container"
        docker stop $container
        echo "Removing container: $container"
        docker rm $container
    done
}

# Function to remove images based on repository name
remove_images() {
    # Find images that match a specific pattern and remove them
    for image in $(docker images --format '{{.Repository}}:{{.Tag}}' | grep $1); do
        echo "Removing image: $image"
        docker rmi $image
    done
}

# Stop and remove containers related to the frontend and API
echo "Processing frontend containers..."
stop_and_remove_containers "frontend-prod"

echo "Processing API containers..."
stop_and_remove_containers "api-prod"

# Remove images related to the portfolio projects
echo "Removing old images..."
remove_images "romori1993/portfolio-site"

# Pull the latest images
echo "Pulling the latest Docker images..."
docker pull romori1993/portfolio-site-api-deploy:latest
docker pull romori1993/portfolio-site-frontend-deploy:latest

echo "Creating Docker network 'portfolio-nw' if it doesn't exist..."
if ! docker network ls | grep -q portfolio-nw; then
    docker network create portfolio-nw
fi

# Run the images as containers
echo "Running the Docker images as containers..."
docker run -d -p 8000:8000 --name frontend-prod --network portfolio-nw romori1993/portfolio-site-frontend-deploy:latest
docker run -d -p 8080:80 --name api-prod --network portfolio-nw romori1993/portfolio-site-api-deploy:latest

echo "Containers are up and running."