#!/bin/bash

echo('Updating system...')
sudo apt update
sudo apt upgrade -y

echo('Installing Python3 and PIP...')
sudo apt install python3-pip -y

echo('Installing Bluez and pybluez...')
sudo apt install bluez -y
audo apt install python3-bluez