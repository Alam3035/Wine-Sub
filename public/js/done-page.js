$(() => {

    $.get(`/api/order/txid`).then(data => {
        data.forEach(e => {
            $("#done-detail").append(FinishDone(
                e.txid,
            ))
        });
    });

    const FinishDone = (txid) => {
        return `
            <h1>Order Completed</h1>
            <a href="">This is your transaction hash ${txid} </a>
        `
    }
});