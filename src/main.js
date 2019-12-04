import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from '@/firebase/init';
import { firestorePlugin } from 'vuefire';
import moment from 'moment';
import Default from './layouts/Default';
import 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';

//Firebase
Vue.use(firestorePlugin);

// Layouts
Vue.component('default-layout', Default);

// Filters
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment.unix(String(value)).format('DD/MM/YYYY hh:mm');
    }
});

// General Settings
Vue.config.productionTip = false;
let app = null;

// Firebase authentication check
auth.onAuthStateChanged(user => {
    // Initialize app if not created
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    }

    // Save the current user in the store (if page is refreshed, user stays logged in)
    store.commit('setUser', user);
});
