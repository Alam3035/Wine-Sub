exports.seed = function(knex, Promise) {
    return knex('wines').insert([{
        winename: 'alam',
        grape: 'alam',
        place: 'america',
    }, {
        winename: '',
        grape: '',
        country: ''
    }, {

    }], )
}