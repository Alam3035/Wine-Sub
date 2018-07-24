exports.seed = function(knex, Promise) {
    return knex('users').insert([{
        username: 'alam3035',
        password: 'alam3035',
        email: 'alam@alam.com',
        telephone: '12345678',
        address: 'flat 123 HONG Kong'
    }])
}