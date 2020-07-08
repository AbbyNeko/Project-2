// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    path_id1: {
      type: DataTypes.INTEGER
    },
    path_id2: {
      type: DataTypes.INTEGER
    },
    path_id3: {
      type: DataTypes.INTEGER
    },
    path_id4: {
      type: DataTypes.INTEGER
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.attackEnemy(attacker, enemy) {
    //Subtracts attack pts of character from enemy HP

  };

  User.prototype.heal(character) {
      //Sets Heals to true

  };

  User.prototype.block(character) {
      //Set Blocked to true

  };

  User.prototype.takeDamage(character, enemy) { 
      //Subtracts attacks pts of enemy from character HP

  };
  
  User.prototype.levelUp(character) {
      //Increases stats and resets Heals
      
  }

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
