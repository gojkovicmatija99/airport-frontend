<template>
  <div class="flights">
    <b-container>    
      <h1>All available flights</h1><br>  
      <b-row>
        <b-col col lg="7">
          <b-pagination
          v-model="currentPage"
          :total-rows="numberOfAvailableFlights"
          :per-page="perPage"
          aria-controls="flights-table"
          @input="changePage"
          ></b-pagination>
        </b-col>
        <b-col col lg ="2">
          <b-form-select v-model="selected" :options="options"></b-form-select>         
        </b-col>
        <b-col col lg ="2">
          <b-form-input v-model="filter"></b-form-input>
        </b-col>
        <b-col col lg ="1">
          <b-button @click="filterFlights">Filter</b-button>
        </b-col>
      </b-row>
      <b-table
          id="flights-table"
          striped hover
          :items="flights"
          @row-clicked="load_creditCards">
      </b-table>
      <b-container v-if="this.flag == true">
          <b-row>
              <b-col cm="6" >
                  <b-table
                      hover v-if="creditCards.length"
                      sticky-header="800px"
                      :items="creditCards"
                      :fields="fields"
                      head-variant="light"
                      @row-clicked="buyTicket">
                  </b-table>
                  <h1 v-else>
                      <b-button variant="danger" @click="addCreditCard">Add Credit Card</b-button>
                  </h1>
              </b-col>
          </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "@/router";
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Flights',
  computed: {
      ...mapState(['flights']),
      ...mapState(['token']),
      ...mapState(['numberOfAvailableFlights']),
      ...mapState(['creditCards'])
    },
    data() {
      return {
        flag: false,
        flightId: 0,
        perPage: 3,
        currentPage: 1,
        filter: null,
        selected: null,
        options: [
          { value: 'id', text: 'Flight Id' },
          { value: 'airplaneId', text: 'Airplane Id' },
          { value: 'startDestination', text: 'Start Destination' },
          { value: 'endDestination', text: 'End Destination' },
          { value: 'distance', text: 'Distance' },
          { value: 'price', text: 'Price' },
        ],
        fields: [
          { key: 'firstName' },
          { key: 'lastName' },
          { key: 'cardNum' },
          { key: 'securityNum' }
        ]
      }
    },
  mounted: function() {
    this.load_number_of_available_flights();
    this.load_available_flights(this.currentPage);
  },
  methods: {
    ...mapActions(['load_available_flights']),
    ...mapActions(['load_number_of_available_flights']),
    ...mapActions(['load_filtered_flights']),
    ...mapActions(['load_available_creditCards']),
    ...mapActions(['buy_ticket']),
    changePage: function() {
      this.load_available_flights(this.currentPage);
    },
    filterFlights: function() {
      console.log(this.selected);
      console.log(this.filter);
      var dto = [this.selected, this.filter];
      this.load_filtered_flights(dto);
    },
    load_creditCards: function(item, index, event) {
      this.load_available_creditCards();
      this.flag = true;
      this.flightId = item.id;
      console.log(this.flightId);
    },
    addCreditCard: function (item, index, event) {
      this.$router.push('addCreditCard');
    },
    buyTicket: function() {
      this.buy_ticket(this.flightId);
    }
  }
}
</script>