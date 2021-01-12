<template>
    <div>
        <b-table
                hover v-if="creditCards.length"
                sticky-header="800px"
                :items="creditCards"
                :fields="fields"
                head-variant="light"
                @row_click="buy_ticket"
        </b-table>
    </div>
</template>

<script>
    import router from "@/router";
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "BuyTicket",
        computed: {
            ...mapState(['creditCards'])
        },
        data() {
            return {
                fields: [
                    { key: 'firstName' },
                    { key: 'lastName' },
                    { key: 'cardNum' },
                    { key: 'securityNum' }
                ]
            }
        },
        methods: {
            ...mapActions(['buy_ticket']),

            addCreditCard: function (item, index, event) {
                this.$router.push('addCreditCard');
            },
            buyTicket: function() {

            }
        }
    }
</script>

<style scoped>

</style>