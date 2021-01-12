<template>
    <div>
        <b-container fluid>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-button variant="primary" size="lg" @click="logoutUser">SignOut</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'Logout',
        computed: {
            ...mapState(['token'])
        },
        methods: {
            ...mapActions(['set_token']),

            logoutUser: function() {
                this.set_token();
                this.$router.push('login');
            }
        }
    }
</script>