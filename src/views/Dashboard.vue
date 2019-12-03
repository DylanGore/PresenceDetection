<template>
    <div id="dashboard" class="container">
        <div class="row">
            <div class="col s12">
                <h1>Dashboard</h1>
                <MQTTInfo />
            </div>
        </div>
    </div>
</template>

<script>
import MQTTInfo from '../components/mqtt/MQTTInfo';
export default {
    name: 'dashboard',
    components: {
        MQTTInfo
    },
    data() {
        return {};
    }
};
</script>
