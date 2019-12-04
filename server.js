// Setup .env file
require('dotenv').config();

// Imports
const mqtt = require('mqtt');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

// MQTT Settings
const mqtt_host = process.env.MQTT_HOST;
const mqtt_user = process.env.MQTT_USER;
const mqtt_pass = process.env.MQTT_PASS;
const client = mqtt.connect(mqtt_host, {
    username: mqtt_user,
    password: mqtt_pass
});

let people = [];
let rooms = [];
let signals = [];
let inRoom = null;

// Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

// MQTT Subscribe
client.on('connect', () => {
    console.log('MQTT Connected!');
    client.subscribe('presence/#');

    // prettier-ignore
    admin.firestore().collection('people').orderBy('slug', 'asc').get().then(res => {
        res.forEach(doc => {
            people.push({name: doc.data().name, slug: doc.data().slug});
            console.log(`Person Added: ${doc.data().name}`);
        });
    }).catch(err => console.error(err.message));

    // prettier-ignore
    admin.firestore().collection('rooms').orderBy('slug', 'asc').get().then(res => {
        console.log();
        res.forEach(doc => {
            rooms.push(doc.data().slug);
            console.log(`Room Added: ${doc.data().name}`);
        });
        console.log();
    }).catch(err => console.error(err.message));
});

// Process incomming MQTT messages
client.on('message', (topic, message) => {
    if (!topic.includes('presence/status')) {
        let lastSignal = null;
        let sig = null;
        people.forEach(person => {
            rooms.forEach(room => {
                if (topic.includes(`presence/${room}/`)) {
                    sig = JSON.parse(message.toString());
                    sig.room = room;
                    signals[room] = {
                        room: room,
                        rssi: sig.rssi,
                        timestamp: sig.timestamp
                    };
                    // prettier-ignore
                    console.log(`\tMQTT Received: ${room} - ${message.toString()}`);
                }
            });

            // console.log(signals);
            // prettier-ignore
            var sigArray = []
            rooms.forEach(room => {
                sigArray.push(signals[room]);
            });

            // console.log('sig Array: ' + sigArray.length);
            sigArray = sigArray.map(obj => {
                if (obj !== undefined) {
                    return obj;
                } else {
                    return { rssi: -1000 };
                }
            });
            // console.log('sig Array 2: ' + sigArray.length);
            // console.log(sigArray);

            var maximum = Math.max.apply(
                Math,
                sigArray.map(function(o) {
                    return o.rssi;
                })
            );

            // TODO multi-user support
            inRoom = sigArray.find(sig => sig.rssi === maximum);
            console.log(`Math: ${maximum}, ${inRoom.room}`);
            client.publish(`presence/status/${person.slug}`, inRoom.room, {
                retain: true
            });
            // let inRoom = null;
            // if (lastSignal == null) {
            //     inRoom = sig.room;
            // } else {
            //     // prettier-ignore
            //     if (sig.room !== lastSignal.room && sig.rssi > lastSignal.rssi){
            //         inRoom = sig.rssi
            //     }
            // }

            // console.log(`In Room: ${inRoom}`);

            // console.log(signals);

            // if (room1.rssi !== undefined && room2.rssi !== undefined) {
            //     if (room1.rssi > room2.rssi) {
            //         console.log('user in room 1');
            //         client.publish('presence/status/person1', 'room1', {
            //             retain: true
            //         });
            //     } else {
            //         console.log('user in room 2');
            //         client.publish('presence/status/person1', 'room2', {
            //             retain: true
            //         });
            //     }
            // }

            if (signals.length > 30) {
                signals = [];
                console.log('Reset signal array');
            }
        });
    }
});

function firebaseUplod() {
    if (inRoom !== null) {
        // TODO multi-user support
        admin
            .firestore()
            .collection('people')
            .doc('ncKniOlnssuDsdOvlgqf')
            .update({ location: inRoom.room })
            .then(() => console.log('Updated!'))
            .catch(err => console.error(err.message));
    } else {
        console.log('No FB');
    }
    setTimeout(firebaseUplod, 10000);
}

firebaseUplod();
