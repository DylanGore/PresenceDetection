// Setup .env file
require('dotenv').config();

// Imports
const mqtt = require('mqtt');

// MQTT Settings
const mqtt_host = process.env.MQTT_HOST;
const mqtt_user = process.env.MQTT_USER;
const mqtt_pass = process.env.MQTT_PASS;
const client = mqtt.connect(mqtt_host, {
    username: mqtt_user,
    password: mqtt_pass
});

let room1 = {};
let room2 = {};

// MQTT Subscribe
client.on('connect', () => {
    console.log('MQTT Connected!');
    client.subscribe('presence/#');
});

// Process incomming MQTT messages
client.on('message', (topic, message) => {
    if (!topic.includes('presence/status')) {
        if (topic.includes('presence/room1/')) {
            room1 = JSON.parse(message.toString());
            console.log('\tMQTT IN Room 1:' + message.toString());
        }
        if (topic.includes('presence/room2/')) {
            room2 = JSON.parse(message.toString());
            console.log('\tMQTT IN Room 2:' + message.toString());
        }

        if (room1.rssi !== undefined && room2.rssi !== undefined) {
            if (room1.rssi > room2.rssi) {
                console.log('user in room 1');
                client.publish('presence/status/person1', 'room1', {
                    retain: true
                });
            } else {
                console.log('user in room 2');
                client.publish('presence/status/person1', 'room2', {
                    retain: true
                });
            }
        }
    }
});
