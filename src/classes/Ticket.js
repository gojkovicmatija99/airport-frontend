export default class Ticket {
    constructor(flightId, date, canceled) {
        this.flightId = flightId;
        this.date = date;
        if(canceled == 0) {
            this._rowVariant = "danger"
        }
    }
  }