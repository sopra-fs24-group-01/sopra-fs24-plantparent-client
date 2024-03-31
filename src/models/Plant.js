/**
 * Plant model
 */
class Plant {
    constructor(data = {}) {
      this.id = null;
      this.name = null;
      this.species = null;
      this.careInstructions = null;
      this.lastWateringDate = null;
      this.wateringInterval = null;
      this.nextWateringDate = null;
      Object.assign(this, data);
    }
  }
  
  export default User;
