<template>
    <div class="register">
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
                        <b-input v-model="newCardNum" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Card Num"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newSecurityNum" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Security Num"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-button variant="primary" size="lg" @click="addCreditCard">Add Credit Card</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'CreditCard',
        props: {
            firstName: {
                type: String,
                default: ''
            },
            lastName: {
                type: String,
                default: ''
            },
            cardNum: {
                type: Number,
                default: 0
            },
            securityNum: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                newFirstName: '',
                newLastName: '',
                newCardNum: '',
                newSecurityNum: ''
            }
        },
        mounted: function () {
            this.newFirstName = this.firstName;
            this.newLastName = this.lastName;
            this.newCardNum = this.cardNum;
            this.newSecurityNum = this.securityNum;
        },
        methods: {
            ...mapActions(['add_credit_card']),

            addCreditCard: function() {
                const creditCard = JSON.stringify({firstName: this.newFirstName, lastName: this.newLastName,
                                                    cardNum: this.newCardNum, securityNum: this.newSecurityNum});

                this.add_credit_card(creditCard);

                this.newFirstName = '';
                this.newLastName = '';
                this.newCardNum = '';
                this.newSecurityNum = '';
            }
        }
    }
</script>