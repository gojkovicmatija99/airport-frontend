import Vue from 'vue'
import Vuex from 'vuex'
import CreditCard from '../classes/CreditCard.js';
import Flight from "../classes/Flight.js";
import Ticket from '../classes/Ticket.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flights: [],
    users: [],
    token: '',
    numberOfAvailableFlights: 0,
    creditCards: [],
    tickets: []
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
    },
    set_bought_tickets: function(state, ticketsJson) {
      state.tickets = []
      for(var index in ticketsJson) {
        var flightId = ticketsJson[index].flightId;
        var date = ticketsJson[index].date;
        var canceled = ticketsJson[index].canceled;
        const ticket = new Ticket(flightId, date, canceled);
        state.tickets.push(ticket);
      }
    },
    set_number_of_available_flights: function (state, size) {
      state.numberOfAvailableFlights = size;
    },
    set_creditCards: function (state, creditCardsJson) {
      state.creditCards = []
      for(var index in creditCardsJson) {
        var firstName = creditCardsJson[index].firstName;
        var lastName = creditCardsJson[index].lastName;
        var cardNum = creditCardsJson[index].cardNum;
        var securityNum = creditCardsJson[index].securityNum;
        const card = new CreditCard(firstName, lastName, cardNum, securityNum);
        state.creditCards.push(card);
      }
    }
  },
  actions: {
    load_available_flights: function ({ commit }, page) {
      fetch('http://localhost:8762/rest-airport-flight-service/flight/all/' + page, { method: 'get' }).then((response) => {
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
    load_number_of_available_flights: function ({ commit }) {
      fetch('http://localhost:8762/rest-airport-flight-service/flight/size/', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json()
      }).then((size) => {
        commit('set_number_of_available_flights', size)
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
      fetch('http://localhost:8762/rest-airport-flight-service/flight/search', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
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
      fetch('http://localhost:8762/rest-airport-flight-service/flight/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
        body: json
        }).then((response) => {
        if (!response.ok)
          throw response;
        alert("Flight has been added!");
      }).catch((error) => {
          alert("Access denied!");
      });
    },
    cancel_flight: function ({ commit }, flightId) {
      fetch('http://localhost:8762/rest-airport-flight-service/flight/cancel/' + flightId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        }}).then((response) => {
        if (!response.ok)
          throw response;
        alert("Flight has been canceled!")
      }).catch((error) => {
          alert("Access denied!");
      });
    },
    add_airplane: function ({ commit }, airplane) {
      const json = JSON.stringify(airplane)
      console.log(this.state.token);
      fetch('http://localhost:8762/rest-airport-flight-service/airplane/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
        body: json
        }).then((response) => {
        if (!response.ok)
          throw response;
        alert("Airplane has been added!");
      }).catch((error) => {
          alert("Access denied!");
      });
    },
    remove_airplane: function ({ commit }, airplaneId) {
      fetch('http://localhost:8762/rest-airport-flight-service/airplane/delete/' + airplaneId, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        }}).then((response) => {
        if (!response.ok)
          throw response;
        alert("Airplane has been removed!")
      }).catch((error) => {
          alert("Access denied!");
      });
    },
    new_user: function({ commit }, user) {
      fetch('http://localhost:8762/rest-airport-user-service/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok) {
          console.log(response)
          throw response;
        }
        return 'success'
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    login_user: function({ commit }, user){
      fetch('http://localhost:8762/rest-airport-user-service/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        this.state.token = response.headers.get("Authorization");
        console.log(this.state.token);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert("Bad Credentials");
          });
        else
          alert(error);
      });
    },
    update_user: function({ commit }, user){
      fetch('http://localhost:8762/rest-airport-user-service/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        this.state.token = '';
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    add_credit_card: function({ commit }, creditCard){
      fetch('http://localhost:8762/rest-airport-user-service/add_creditCard', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
        body: creditCard
      }).then((response) => {
        if (!response.ok)
          throw response;


      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    is_admin: function ({ commit }) {
      fetch('http://localhost:8762/rest-airport-user-service/is_admin',
      {
        method: 'get',
        headers: {
          'Authorization': this.state.token
      }}).then((flightsJson) => {
        return flightJson;
      }).then((response) => {
        if (!response.ok)
          return false;
        return true;
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_available_creditCards: function({ commit }){
      fetch('http://localhost:8762/rest-airport-user-service/get_creditCards', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('set_creditCards', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_bought_tickets: function ({ commit }) {
      fetch('http://localhost:8762/rest-airport-ticket-service/purchase/bought', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json()
      }).then((ticketsJson) => {
        commit('set_bought_tickets', ticketsJson)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    buy_ticket: function ({ commit }, flightId) {
      fetch('http://localhost:8762/rest-airport-ticket-service/purchase/ticket/' + flightId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        }}).then((response) => {
        if (!response.ok)
          throw response;
      }).catch((error) => {
          alert("Access denied!");
      });
    },
    set_token: function({ commit }) {
        this.state.token = '';
    }
  },
  modules: {
  }
})
