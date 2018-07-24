$(() => {
    $('#s1').on('click', (e) => {
        e.preventDefault();
        console.log('hi');
        axios.put('/api/subscription', {
            "subscription": 1
        })
        .then(() => location.reload())
        .catch(err => console.log(err));
    })

    $('#s2').on('click', (e) => {
        e.preventDefault();
        console.log('hi');
        axios.put('/api/subscription', {
            "subscription": 4
        })
        .then(() => location.reload())
        .catch(err => console.log(err));
    })

    $('#s3').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/subscription', {
            "subscription": 12
        })
        .then(() => location.reload())
        .catch(err => console.log(err));
    })
})