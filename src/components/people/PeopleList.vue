<template>
    <div class="people-list row">
        <div class="col s12 m6" v-for="person in people" v-bind:key="person.name">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">
                        {{ person.name }}
                        <span class="badge teal white-text">{{ person.location }}</span>
                    </span>
                    <p>
                        <b>Last Updated:</b>
                        {{ person.lastUpdate.seconds | formatDate }}
                    </p>
                    <p>
                        <b>Device:</b>
                        {{ person.mac }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../../firebase/init';

export default {
    name: 'PeopleList',
    data: function() {
        return {
            people: []
        };
    },
    firestore: {
        people: db.collection('people').orderBy('lastUpdate', 'desc')
    }
};
</script>
