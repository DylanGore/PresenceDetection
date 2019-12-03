<template>
    <div class="mqtt-info row">
        <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">
                        Person 1 <span class="badge teal white-text">{{ this.$data.person1 }}</span>
                    </span>
                    <p>
                        Last Updated: N/A
                    </p>
                </div>
                <!-- <div class="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                </div> -->
            </div>
        </div>
        <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">
                        Person 2 <span class="badge teal white-text">{{ this.$data.person1 }}</span>
                    </span>
                    <p>
                        Last Updated: N/A
                    </p>
                </div>
                <!-- <div class="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                </div> -->
            </div>
        </div>
        <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">
                        Person 3 <span class="badge teal white-text">{{ this.$data.person1 }}</span>
                    </span>
                    <p>
                        Last Updated: N/A
                    </p>
                </div>
                <!-- <div class="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'matt-info',
    created: function() {
        this.get_mqtt();
    },
    data: function() {
        return {
            person1: 'N/A'
        };
    },
    mqtt: {
        'presence/status/person1': function(val) {
            console.log('presence/status/person1');
            this.$data.person1 = val;
        }
    },
    methods: {
        get_mqtt() {
            this.$mqtt.subscribe('presence/status/person1');
        }
    }
};
</script>
