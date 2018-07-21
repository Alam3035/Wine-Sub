const bcrypt = require('bcrypt');

module.exports.hashPassword = plainTextPassword => new Promise((resolve, reject) => {
    bcrypt.genSalt((err, salt) => {
        if (err) {
            reject(err);
        }

        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
});


module.exports.checkPassword = (plainTextPassword, hashedPassword) => new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, hashedPassword, (err, match) => {
        console.log(plainTextPassword);
        console.log(hashedPassword);
        if (err) {
            reject(err);
        }

        resolve(match);
    });
});