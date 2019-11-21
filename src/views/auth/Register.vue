<template>
    <div id="register" class="container">
        <div class="row">
            <div id="formCard" class="col s12 card-panel">
                <h1>Register</h1>
                <form id="registerForm" @submit.prevent="register" method="post">
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
                    <div class="input-field">
                        <label for="passwordConfirm">Confirm Password</label>
                        <input id="passwordConfirm" v-model="passwordConfirm" name="passwordConfirm" type="password" required />
                    </div>
                    <button class="btn waves-effect waves-light teal" type="submit" name="action">
                        Create Account
                    </button>
                </form>
                <p id="backlink">
                    <router-link to="/login">
                        <span class="iconify" data-icon="fa:arrow-left"></span>
                        Back to login
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            error: null,
            email: null,
            password: null,
            passwordConfirm: null
        };
    },
    methods: {
        register() {
            this.error = null;

            if (this.email && this.password && this.passwordConfirm) {
                if (this.password === this.passwordConfirm) {
                    this.$store.dispatch('userRegister', {
                        email: this.email,
                        password: this.password
                    });
                } else {
                    this.error = 'Passwords do not match!';
                    this.password = null;
                    this.passwordConfirm = null;
                }
            } else {
                this.error = 'Please fill all fields!';
            }
        }
    },
    computed: {
        authError() {
            if (this.error) {
                return this.error;
            }
            return this.$store.getters.authError;
        }
    }
};
</script>

<style lang="css" scoped>
.formError{
    padding: 0.5em;
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
