<template>
    <div v-if="token == ''" class="login">
        <b-container fluid>
            <b-form>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newEmail" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Email"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newPassword" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Password"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-button variant="primary" size="lg" @click="loginUser">SignIn</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'Login',
        computed: {
            ...mapState(['token'])
        },
        props: {
            email: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newEmail: '',
                newPassword: ''
            }
        },
        mounted: function () {
            this.newEmail = this.email;
            this.newPassword = this.password;
        },
        methods: {
            ...mapActions(['login_user']),

            loginUser: function() {
                const user = JSON.stringify({email: this.newEmail, password: this.newPassword});

                this.login_user(user);

                this.newEmail = '';
                this.newPassword = '';
            }
        }
    }
</script>