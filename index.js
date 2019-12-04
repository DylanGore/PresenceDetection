// Setup .env file
require('dotenv').config();

// Imports
const noble = require('noble');
const mqtt = require('mqtt');
const admin = require('firebase-admin');

// General Variables
const name = process.env.NAME;
const serviceAccount = require('./serviceAccount.json');
let tracking = [];
// Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

var db = admin.firestore();
var people = db
    .collection('people')
    .get()
    .then(res => {
        console.log();
        res.forEach(doc => {
            tracking.push({ name: doc.data().slug, device: doc.data().mac });
            console.log(`Device Added: ${doc.data().mac}`);
        });
        console.log();
    })
    .catch(err => console.error(err.message));

// MQTT Settings
const mqtt_host = process.env.MQTT_HOST;
const mqtt_user = process.env.MQTT_USER;
const mqtt_pass = process.env.MQTT_PASS;
const client = mqtt.connect(mqtt_host, {
    username: mqtt_user,
    password: mqtt_pass
});
const mqtt_base_topic = `presence/${name}/`;

// MQTT Subscribe
client.on('connect', () => {
    console.log('MQTT Connected!');
    client.subscribe(mqtt_base_topic);
});

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
                `${mqtt_base_topic}/users/` + user.name,
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
