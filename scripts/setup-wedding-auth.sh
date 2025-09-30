#!/bin/bash

# Script to generate htpasswd file from wedding.env
# This script should be run on your server

if [ ! -f "/etc/secrets/wedding.env" ]; then
    echo "Error: /etc/secrets/wedding.env not found"
    exit 1
fi

# Source the environment file
source /etc/secrets/wedding.env

# Check if required variables exist
if [ -z "$WEDDING_ADMIN_USER" ] || [ -z "$WEDDING_ADMIN_PASS" ]; then
    echo "Error: WEDDING_ADMIN_USER and WEDDING_ADMIN_PASS must be defined in /etc/secrets/wedding.env"
    echo "Expected format:"
    echo "WEDDING_ADMIN_USER=your_username"
    echo "WEDDING_ADMIN_PASS=your_password"
    exit 1
fi

# Create the htpasswd file
echo "Generating htpasswd file..."
echo "$WEDDING_ADMIN_PASS" | htpasswd -i -c /etc/secrets/wedding.htpasswd "$WEDDING_ADMIN_USER"

if [ $? -eq 0 ]; then
    echo "Successfully created /etc/secrets/wedding.htpasswd"
    echo "File permissions set to 644"
    chmod 644 /etc/secrets/wedding.htpasswd
else
    echo "Error creating htpasswd file"
    exit 1
fi 