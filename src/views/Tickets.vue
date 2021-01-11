<template>
    <div v-if="token == ''" class="login">
        <b-container fluid>
            <b-table striped hover :items="tickets"></b-table>
        </b-container>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'Login',
        computed: {
            ...mapState(['tickets'])
        },
        mounted: function () {
            
        },
        methods: {
            ...mapActions(['load_bought_tickets'])
        }
    }
</script>