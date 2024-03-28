/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.username = null;
    this.email = null;
    Object.assign(this, data);
  }
}

export default User;
