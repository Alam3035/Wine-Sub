const bcrypt = require('../utils/bcrypt.js');

class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    updateUser(id, username, email, telephone, address) {
        let updatePromises = [];

        if (username) {
            let updateName = this.knex('users').where('id', id).update('username', username);
            updatePromises.push(updateName)
        }

        if (email) {
            let select = this.knex('users').column(["email"]).where('email', eamil)
                .then((result) => {
                    if (result == 0) {
                        return this.knex('users').where('id', id).update('email', email)
                    } else {
                        return Promise.reject();
                    }
                })
            updatePromises.push(select)
        }
        return Promise.all(updatePromises)
            .then(() => {
                console.log(updatePromises)
            })
            .catch((err) => console.log(err))
    }

    //Add the services that the user can do ad translate it to knex syntax
}

module.exports = UserService;