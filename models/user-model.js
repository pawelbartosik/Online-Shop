const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
    });
  }

  existingUser() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async boolExistingUser() {
    const existingUser = await this.existingUser();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
