<template>
  <div class="flights">
    <b-container>    
      <h1>All available flights</h1><br>  
      <b-row>
        <b-col col lg="7">
          <b-pagination
          v-model="currentPage"
          :total-rows="flights.length*10"
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
      <b-table id="flights-table" striped hover :items="flights"></b-table>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Flights',
  computed: {
      ...mapState(['flights']),
      ...mapState(['token']),
    },
    data() {
      return {
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
     this.load_available_flights(this.currentPage);
  },
  methods: {
    ...mapActions(['load_available_flights']),
    ...mapActions(['load_filtered_flights']),
    changePage: function() {
      this.load_available_flights(this.currentPage);
    },
    filterFlights: function() {
      console.log(this.selected);
      console.log(this.filter);
      var dto = [this.selected, this.filter];
      this.load_filtered_flights(dto);
    }
  }
}
</script>