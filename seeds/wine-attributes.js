exports.seed = function(knex, Promise) {
    return knex('wines').insert([{
        winename: 'Alain Gras St Romain Rouge',
        grape: 'Pinot Noir',
        taste: 'Dry',
        country: 'France',
        place: 'Burgundy',    
        year: '2013',
        price: '388',
        photoid:'1',
        quantity: '100',

    }, {
        winename: 'Ampelidae Marigny-Neuf',
        grape: 'Pinot Noir',
        taste: 'Dry',
        country: 'France',
        place: 'Loire Valley',    
        year: '2016',
        price: '75',
        photoid:'2',
        quantity: '100',
    }, {
        winename: 'Argyle Reserve',
        grape: 'Pinot Noir',
        taste: 'Dry',
        country: 'United States',
        place: 'Oregon',    
        year: '2015',
        price: '358',
        photoid:'3',
        quantity: '100',
    },  {
        winename: 'Abadia Retuerta Pago Garduna Syrah',
        grape: 'Shiraz',
        taste: 'Dry',
        country: 'Spain',
        place: 'Vino De La Tierra Sardon De Duero',    
        year: '2010',
        price: '798',
        photoid:'4',
        quantity: '100',
    },  {
        winename: 'Alain Gras St Romain Rogue',
        grape: 'Shiraz',
        taste: 'Dry',
        country: 'France',
        place: 'Burgundy',    
        year: '2013',
        price: '388',
        photoid:'5',
        quantity: '100',
    },  {
        winename: 'Arlaud Gevrey Chambertin',
        grape: 'Shiraz',
        taste: 'Dry',
        country: 'France',
        place: 'Burgundy',    
        year: '2014',
        price: '520',
        photoid:'6',
        quantity: '100',
    }, {
        winename: 'Abadia Retuerta Pago Garduna Syrah',
        grape: 'Shiraz',
        taste: 'Dry',
        country: 'Spain',
        place: 'Vino De La Tierra Sardon De Duero',    
        year: '2010',
        price: '798',
        photoid:'7',
        quantity: '100',
    }, {
        winename: 'Beringer Quantum',
        grape: 'Merlot',
        taste: 'Dry',
        country: 'United States',
        place: 'NAPA',    
        year: '2014',
        price: '488',
        photoid:'8',
        quantity: '100',
    }, {
        winename: 'Branaire Ducru St Julien 4eme Cru',
        grape: 'Merlot',
        taste: 'Dry',
        country: 'France',
        place: 'Bordeaux',    
        year: '2014',
        price: '580',
        photoid:'9',
        quantity: '100',
    } ,{
        winename: 'Avignonesi Vino Nobile di Montepulciano',
        grape: 'Sangiovese',
        taste: 'Dry',
        country: 'Italy',
        place: 'Tuscany',    
        year: '2014',
        price: '175',
        photoid:'10',
        quantity: '100',
    }], )
}