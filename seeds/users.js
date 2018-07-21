exports.seed = function(knex, Promise) {
    return knex('users').insert([{
        username: 'alam',
        password: 'alam'
    }])
}