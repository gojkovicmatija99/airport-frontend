import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class Flight {
  constructor(id, airplaneId, startDestination, endDestination, distance, price, currentPassengers, isCanceled) {
    this.id = id;
    this.airplaneId = airplaneId;
    this.startDestination = startDestination;
    this.endDestination = endDestination;
    this.distance = distance;
    this.price = price;
    this.currentPassengers = currentPassengers;
    if(isCanceled)
      this._rowVariant = "danger" 
  }
}

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
        const flight = new Flight(id, airplaneId, startDestination, endDestination, distance, price, currentPassengers, canceled);
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
  },
  modules: {
  }
})
