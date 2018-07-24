const Knex = require ('/knex');
const a = require ('#1').attr('id');
const b = require('#3').attr('id');
const c = require('#12').attr('id');
const choice = [];
const promise = new Promise;
let userid = user;

$(() => {

    $.get(`/api/order/subscription`).then(data => {
        data.forEach(e => {
            $("#choice").append(FinishDone(
                e.userid,
                e.choice
            ))
        });
    });

});





    