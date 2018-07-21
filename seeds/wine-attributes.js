exports.seed = function(knex, Promise) {
    return knex('wines').insert([{
        username: 'alam',
        password: 'alam'
    }])
}