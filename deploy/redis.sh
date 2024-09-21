#!/bin/bash

# Check if Redis Insight container is running
if ! docker ps --format '{{.Names}}' | grep -w '^redisinsight$' > /dev/null; then
    if docker ps -a --format '{{.Names}}' | grep -w '^redisinsight$' > /dev/null; then
        echo "Starting existing Redis Insight container..."
        docker start redisinsight
    else
        echo "Running new Redis Insight container with password protection..."
        # Define your desired username and password
        RI_USERNAME='admin'
        RI_PASSWORD='password'  # Replace with a strong password

        docker run -d \
            --name redisinsight \
            --network portfolio-nw \
            -p 8001:8001 \
            -e RIUSER=$RI_USERNAME \
            -e RIPASS=$RI_PASSWORD \
            redis/redisinsight:latest
    fi
else
    echo "Redis Insight container is already running."
fi

# Check if Redis container is running
if ! docker ps --format '{{.Names}}' | grep -w '^redis-prod$' > /dev/null; then
    if docker ps -a --format '{{.Names}}' | grep -w '^redis-prod$' > /dev/null; then
        echo "Starting existing Redis container..."
        docker start redis-prod
    else
        echo "Running new Redis container..."
        docker run -d --name redis-prod --network portfolio-nw redis:latest
    fi
else
    echo "Redis container is already running."
fi