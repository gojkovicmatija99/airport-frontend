<template>
    <div>
        <b-table
                hover v-if="creditCards.length"
                sticky-header="800px"
                :items="creditCards"
                :fields="fields"
                head-variant="light"
            <template v-slot:cell(action)="row">
                <b-button variant="danger" @click="buy_ticket(row.item.id)">Buy Ticket</b-button>
            </template>
        </b-table>
        <h1 v-else>No coupons</h1>
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
            ...mapActions(['delete_sitesCoupon']),

            editSitesCoupon: function (item, index, event) {
                router.push({path: `/sitesCoupons/${item.id}`})
            }
        }
    }
</script>

<style scoped>

</style>