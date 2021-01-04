import Vue from 'vue'
import Vuex from 'vuex'
import Flight from "../classes/Flight.js";
import Airplane from "../classes/Airplane.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flights:[]
  },
  mutations: {
    set_flights: function (state, flightsJson) {
      state.flights = []
      for(var index in flightsJson) {
        var id = flightsJson[index].id;
        var airplaneId = flightsJson[index].airplaneId;
        var startDestination = flightsJson[index].startDestination;
        var endDestination = flightsJson[index].endDestination;
        var distance = flightsJson[index].distance;
        var price = flightsJson[index].price;
        var currentPassengers = flightsJson[index].currentPassengers;
        var canceled = flightsJson[index].canceled;
        const flight = new Flight(id, airplaneId, startDestination, endDestination, distance, price, currentPassengers, canceled, false);
        state.flights.push(flight);
      }
    }
  },
  actions: {
    load_available_flights: function ({ commit }, page) {
      fetch('http://localhost:8082/flight/all/' + page, { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json()
      }).then((flightsJson) => {
        commit('set_flights', flightsJson)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_filtered_flights: function ({ commit }, dto) {
      var name = dto[0]
      var obj = {};
      obj[name] = dto[1]
      const filter = JSON.stringify(obj);
      console.log(filter);
      fetch('http://localhost:8082/flight/search', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: filter
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json()
      }).then((flightsJson) => {
        commit('set_flights', flightsJson)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    add_flight: function ({ commit }, flight) {
      const json = JSON.stringify(flight)
      fetch('http://localhost:8082/flight/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
        }).then((response) => {
        if (!response.ok)
          throw response;
        alert("Flight has been added!");
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    cancel_flight: function ({ commit }, flightId) {
      fetch('http://localhost:8082/flight/cancel/' + flightId, { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;
        alert("Flight has been canceled!")
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    add_airplane: function ({ commit }, airplane) {
      const json = JSON.stringify(airplane)
      fetch('http://localhost:8082/airplane/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
        }).then((response) => {
        if (!response.ok)
          throw response;
        alert("Airplane has been added!");
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    remove_airplane: function ({ commit }, airplaneId) {
      fetch('http://localhost:8082/airplane/delete/' + airplaneId, { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;
        alert("Airplane has been removed!")
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
  },
  modules: {
  }
})
