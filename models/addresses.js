var Sequelize = require('sequelize');
 
module.exports = function (sequelize) {

    var Contacts = sequelize.define('Contacts', {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phonenumber: {
            type: Sequelize.STRING,
        },
        contact: {
            type: Sequelize.STRING,
        }
    },
        {
            underscored: true
        });

    return Contacts;
};
