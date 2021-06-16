//to be logged when a response is successful
class Success {
    constructor(data) {
      this.status = "OK";
      this.data = data;
    }
  }
  
module.exports = Success;