<template>
    <div id="login" class="container">
        <div class="row">
            <div id="formCard" class="col s12 card-panel">
                <h1>Login</h1>
                <form id="loginForm" @submit.prevent="login" method="post">
                    <div class="formError" v-if="authError">
                        <p>{{ authError }}</p>
                    </div>
                    <div class="input-field">
                        <label for="email">E-mail Address</label>
                        <input id="email" v-model="email" name="email" type="email" class="validate" required />
                    </div>
                    <div class="input-field">
                        <label for="password">Password</label>
                        <input id="password" v-model="password" name="password" type="password" required />
                    </div>
                    <button class="btn waves-effect waves-light teal" type="submit" name="action">
                        Login
                    </button>
                </form>
                <p id="backlink">Don't have an account? <router-link to="/register">Register now</router-link>.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            email: null,
            password: null
        };
    },
    methods: {
        login() {
            this.error = null;

            if (this.email && this.password) {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
            } else {
                this.error = 'Please fill all fields!';
            }
        }
    },
    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    }
};
</script>

<style lang="css" scoped>
.formError{
    /* padding: 0.5em; */
    background: red;
    color: #fff;
}

#formCard{
    margin: 1em;
}

#backlink{
    padding: 1em 0;
}
</style>
