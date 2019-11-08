#!/bin/bash

UNDERLINE="\\e[4m"
RESET="\\e[0m"

echo -e "\n\n Presence Detection Setup Script (Intended for use with the Raspberry Pi Zero W) \n\n"

echo -e "\n$UNDERLINE Updating system... $RESET\n"
sudo apt update
sudo apt upgrade -y

echo -e "\n\n$UNDERLINE Installing git... $RESET\n"
sudo apt install git -y

echo -e "\n\n$UNDERLINE Installing Bluez and Bluetooth Dependencies... $RESET\n"
sudo apt install bluetooth bluez libbluetooth-dev libudev-dev -y

echo -e "\n\n$UNDERLINEInstalling Node.JS 8.11.1 $RESET\n"

# Node JS script By Steven de Salas
# Based on script by Richard Stanley @ https://github.com/audstanley/Node-MongoDb-Pi/
# This is for a RaspberryPi Zero but should work across all models.

VERSION=v8.11.1;

# Creates directory for downloads, and downloads node
cd ~/ && mkdir temp && cd temp;
wget https://nodejs.org/dist/$VERSION/node-$VERSION-linux-armv6l.tar.gz;
tar -xzf node-$VERSION-linux-armv6l.tar.gz;
# Remove the tar after extracing it.
sudo rm node-$VERSION-linux-armv6l.tar.gz;
# This line will clear existing nodejs
sudo rm -rf /opt/nodejs;
# This next line will copy Node over to the appropriate folder.
sudo mv node-$VERSION-linux-armv6l /opt/nodejs/;
# Remove existing symlinks
sudo unlink /usr/bin/node;
sudo unlink /usr/sbin/node;
sudo unlink /sbin/node;
sudo unlink /usr/local/bin/node;
sudo unlink /usr/bin/npm;
sudo unlink /usr/sbin/npm;
sudo unlink /sbin/npm;
sudo unlink /usr/local/bin/npm;
# Create symlinks to node && npm
sudo ln -s /opt/nodejs/bin/node /usr/bin/node;
sudo ln -s /opt/nodejs/bin/node /usr/sbin/node;
sudo ln -s /opt/nodejs/bin/node /sbin/node;
sudo ln -s /opt/nodejs/bin/node /usr/local/bin/node;
sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm;

echo -e "\n\n$UNDERLINE Downloading Room Marker code... $RESET\n"
git clone https://github.com/DylanGore/PresenceDetection.git "room-marker"
cd "room-marker"
git checkout "room-marker"

echo -e "\n\n$UNDERLINE Installing NPM dependencies... $RESET\n"
npm install

cd ../
echo -e "\n\n$UNDERLINE Done! $RESET\n"