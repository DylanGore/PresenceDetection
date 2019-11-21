<template>
    <div id="app">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<style>
/* Global CSS */
</style>
<script>
const default_layout = 'default';

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + '-layout';
        }
    },
    mounted() {
        M.AutoInit(); // That way, it is only initialized when the component is mounted
    }
};
</script>
