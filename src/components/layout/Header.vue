<template>
    <header class="navbar">
        <nav id="topnav" class="teal darken-4">
            <div class="nav-wrapper">
                <router-link class="brand-logo" to="/">
                    <span class="iconify" data-icon="mdi:crosshairs-gps"></span>
                    Presence Detection
                </router-link>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                    <!-- <span class="iconify icon-4x" data-icon="mdi:menu"></span> -->
                </a>
                <ul class="right hide-on-med-and-down">
                    <li v-if="getUser">
                        <router-link to="/dashboard">
                            <span class="iconify" data-icon="mdi:view-dashboard"></span>
                            Dashboard
                        </router-link>
                    </li>
                    <li v-else>
                        <router-link to="/">
                            <span class="iconify" data-icon="mdi:home"></span>
                            Home
                        </router-link>
                    </li>

                    <li v-if="getUser">
                        <a @click.prevent="logout" href="#">
                            <span class="iconify" data-icon="mdi:exit-run"></span>
                            Log Out
                        </a>
                    </li>
                    <li v-else>
                        <router-link to="/login">
                            <span class="iconify" data-icon="mdi:login-variant"></span>
                            Log In
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li v-if="getUser">
                <a @click.prevent="logout" href="#"> Log Out <span class="iconify" data-icon="mdi:exit-run"></span> </a>
            </li>
            <li v-else>
                <router-link to="/login">
                    <span class="iconify" data-icon="mdi:login-variant"></span>
                </router-link>
            </li>
        </ul>
    </header>
</template>

<script>
export default {
    name: 'mainheader',
    data() {
        return {
            showNav: false
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('userLogout');
        },
        toggleNav() {
            this.showNav = !this.showNav;
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.user;
        }
    }
};
</script>

<style scoped>
#topnav {
    padding: 0 1em;
}
</style>
