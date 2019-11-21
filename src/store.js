import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

// Import Firebase
import { auth } from '@/firebase/init';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        authError: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setAuthError(state, payload) {
            state.authError = payload;
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        authError(state) {
            return state.authError;
        }
    },
    actions: {
        userLogin({ commit }, payload) {
            // Log user in and navigate to home page
            // prettier-ignore
            auth.signInWithEmailAndPassword(payload.email, payload.password).then(() => {
                commit('setUser', auth.currentUser);
                commit('setAuthError', null);
                router.push({name: 'dashboard'});
            }).catch(err => {
                commit('setAuthError', err.message);
            });
        },
        userLogout({ commit }) {
            // Log user out and navigate to home page
            // prettier-ignore
            auth.signOut().then(() => {
                commit('setUser', null);
                commit('setAuthError', null);
                router.push({name: 'home'});
            }).catch(err => {
                commit('setAuthError', err.message);
                alert(err.message);
            });
        },
        userRegister({ commit }, payload) {
            // Create user and navigate to home page
            // prettier-ignore
            auth.createUserWithEmailAndPassword(payload.email,payload.password).then(cred => {
                commit('setUser', cred.user);
                commit('setAuthError', null);

                // Redirect to homepage
                router.push({name: 'dashboard'});

            }).catch(err => {
                commit('setAuthError', err.message);
                commit('setUser', null)
            });
        }
    }
});
