<template>
    <div v-if="token != ''" class="login">
        <b-container>
            <b-table striped hover :items="tickets"></b-table>
        </b-container>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Tickets',
    computed: {
        ...mapState(['tickets']),
        ...mapState(['token'])
    },
    mounted: function () {
        this.load_bought_tickets();
    },
    methods: {
        ...mapActions(['load_bought_tickets'])
    }
}
</script>