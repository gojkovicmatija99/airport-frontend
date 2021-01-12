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
      <b-table id="flights-table" striped hover :items="flights" @row-click="load_creditCards"></b-table>
      <b-container v-if="flag == true">
          <b-row>
              <b-col cm="6" >
                  <BuyTicket/>
              </b-col>
          </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex';
import BuyTicket from "@/components/BuyTicket";
export default {
  name: 'Flights',
  components: {
      BuyTicket
  },
  computed: {
      ...mapState(['flights']),
      ...mapState(['token']),
      ...mapState(['numberOfAvailableFlights'])
    },
    data() {
      return {
        flag: false,
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
    changePage: function() {
      this.load_available_flights(this.currentPage);
    },
    filterFlights: function() {
      console.log(this.selected);
      console.log(this.filter);
      var dto = [this.selected, this.filter];
      this.load_filtered_flights(dto);
    },
    load_creditCards: function() {
      this.load_available_creditCards;
      this.flag = true;
    }
  }
}
</script>