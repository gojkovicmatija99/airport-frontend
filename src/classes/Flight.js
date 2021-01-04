export default class Flight {
    constructor(id, airplaneId, startDestination, endDestination, distance, price, currentPassengers, isCanceled, isModel) {
        if(isModel != true) {
            this.id = id;
        }        
        this.airplaneId = airplaneId;
        this.startDestination = startDestination;
        this.endDestination = endDestination;
        this.distance = distance;
        this.price = price;
        this.currentPassengers = currentPassengers;
        if(isCanceled != 0) {
            this._rowVariant = "danger"
        }      
        if(isModel == true) {
            this.canceled = 'false'; 
        }
        
    }
  }