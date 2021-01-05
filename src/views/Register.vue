<template>
    <div v-if="token == ''" class="register">
        <b-container fluid>
            <b-form>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newFirstName" class="mb-2 mr-sm-2 mb-sm-0" placeholder="First Name"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newLastName" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Last Name"></b-input>
                    </b-col>
                </b-row>
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
                        <b-input v-model="newPassportNum" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Passport Num"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-button variant="primary" size="lg" @click="addNew">SignUp</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'Register',
        computed: {
            ...mapState(['token'])
        },
        props: {
            firstName: {
                type: String,
                default: ''
            },
            lastName: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: ''
            },
            passportNum: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newFirstName: '',
                newLastName: '',
                newEmail: '',
                newPassword: '',
                newPassportNum: ''
            }
        },
        mounted: function () {
            this.newFirstName = this.firstName;
            this.newLastName = this.lastName;
            this.newEmail = this.email;
            this.newPassword = this.password;
            this.newPassportNum = this.passportNum;
        },
        methods: {
            ...mapActions(['new_user']),

            addNew: function() {
                const user = JSON.stringify({firstName: this.newFirstName, lastName: this.newLastName,
                                                    email: this.newEmail, password: this.newPassword,
                                                    passportNum: this.newPassportNum});

                this.new_user(user);

                this.newFirstName = '';
                this.newLastName = '';
                this.newEmail = '';
                this.newPassword = '';
                this.newPassportNum = '';
            }
        }
    }
</script>