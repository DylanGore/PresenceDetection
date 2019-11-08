// Setup .env file
require('dotenv').config();

// Imports
const noble = require('noble');
const mqtt = require('mqtt');

// MQTT Settings
const mqtt_host = process.env.MQTT_HOST;
const mqtt_user = process.env.MQTT_USER;
const mqtt_pass = process.env.MQTT_PASS;
const client = mqtt.connect(mqtt_host, {
    username: mqtt_user,
    password: mqtt_pass
});
const mqtt_base_topic = 'presence/room1/';

// MQTT Subscribe
client.on('connect', () => {
    console.log('MQTT Connected!');
    client.subscribe(mqtt_base_topic);
});

//replace with your hardware address
let tracking = [{ name: 'person1', device: process.env.DEV_MAC }];

// Check for beacon and post to MQTT
noble.on('discover', function(peripheral) {
    tracking.forEach(user => {
        if (peripheral.uuid == user.device) {
            let now = Date.now();
            console.log('User: ' + user.name + '(' + user.device + ')');
            console.log('Time: ' + now);
            console.log('MAC: ' + peripheral.uuid);
            console.log('RSSI: ' + peripheral.rssi + '\n\n');
            client.publish(
                'presence/users/' + user.name,
                JSON.stringify({
                    timestamp: now,
                    mac: peripheral.uuid,
                    rssi: peripheral.rssi
                })
            );
        }
    });
});

// Process incomming MQTT messages
client.on('message', (topic, message) => {
    if (topic === mqtt_base_topic + 'add_user/') {
        let obj = JSON.parse(payload.toString());
        console.log('\tAdd User:' + obj);
    }
});

noble.startScanning([], true); //allows dubplicates while scanning
