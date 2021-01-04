<template>
  <div class="admin">
      <b-container> 
          <b-jumbotron header="Flight Service" lead="Adding and canceling flights"></b-jumbotron>
          <h3> Add flight </h3>
          <b-row>
              <b-col col lg="2">
                  <b-form-input v-model="airplaneIdAddFlight" placeholder="Airplane Id"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-form-input v-model="startDestination" placeholder="Start Destination"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-form-input v-model="endDestination" placeholder="End Destination"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-form-input v-model="price" placeholder="Price"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-form-input v-model="distance" placeholder="Distance"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-button @click="addFlight">Add</b-button>
              </b-col>
          </b-row>
          <br>
          <h3> Cancel flights </h3>
          <b-row>
              <b-col col lg="2">
                  <b-form-input v-model="flightIdCancelFlight" placeholder="Flight Id"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-button @click="cancelFlight">Cancel</b-button>
              </b-col>
          </b-row>
          <br>
          <b-jumbotron header="Airplane Service" lead="Adding and removing airplanes"></b-jumbotron>
          <h3> Add airplane</h3>
          <b-row>
              <b-col col lg="2">
                  <b-form-input v-model="name" placeholder="Name"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-form-input v-model="numberOfSeats" placeholder="Number of seats"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-button @click="addAirplane">Add</b-button>
              </b-col>
          </b-row>
          <br>
          <h3> Remove airplane</h3>
          <b-row>
              <b-col col lg="2">
                  <b-form-input v-model="airplaneIdRemoveAirplane" placeholder="Airplane Id"></b-form-input>
              </b-col>
              <b-col col lg="2">
                  <b-button @click="removeAirplane">Remove</b-button>
              </b-col>
          </b-row>
          <br>
      </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Flight from "../classes/Flight.js";
import Airplane from "../classes/Airplane.js";
export default {
    name: 'Admin',
    data() {
      return {
        airplaneIdAddFlight: '',
        startDestination: '',
        endDestination: '',
        price: '',
        distance: '',
        flightIdCancelFlight: '',
        name: '',
        numberOfSeats: '',
        airplaneIdRemoveAirplane: ''
      }
    },
    methods: {
        ...mapActions(['add_flight']),
        ...mapActions(['cancel_flight']),
        ...mapActions(['add_airplane']),
        ...mapActions(['remove_airplane']),
        addFlight: function() {
            const flight = new Flight(-1, this.airplaneIdAddFlight, this.startDestination, this.endDestination,this.distance, this.price, '0' , 0, true);
            this.add_flight(flight);
        },
        cancelFlight:function() {
            this.cancel_flight(this.flightIdCancelFlight);
        },
        addAirplane: function() {
            const airplane = new Airplane(this.name, this.numberOfSeats);
            this.add_airplane(airplane);
        },
        removeAirplane: function() {
            this.remove_airplane(this.airplaneIdRemoveAirplane);
        }
    }
}
</script>