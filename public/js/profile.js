$(() => {
    // Getting user profile information
    $.get(`/api/user/details`).then(data => {
        data.forEach(e => {
            $("#my-detail").append(UserDetail(
                e.email,
                e.username,
                e.address,
                e.telephone,
            ))
        });
    });

    const UserDetail = (email, username, address, telephone) => {
        return `
            <form action="action/user/details" method="put" enctype="multipart/form-data">
                <div class="row">
                <label>Username:  </label>
                <input type="text" name="username" value="${username}" readonly/>
                </div>

                <div class="row">
                <label>Email:  </label>
                <input type="text" name="username" value="${email}" readonly/>
                </div>

                <div class="row">
                    <label>Telephone:  </label>
                    <input type="text" name="username" value="${telephone}" readonly/>
                </div>

                <div class="row">
                <label>Address:  </label>
                <input type="text" name="username" value="${address}" readonly/>
                </div>
            </form>`
    }

    //Edit the information of user
    $('#editBtn').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/user/details', {
                "username": $('#username').val(),
                "email": $('#email').val(),
                "telephone": $('#telephone').val(),
                "address": $('#address').val(),
            })
            .then(() => location.reload())
            .catch(err => console.log(err));
    })

    $.get(`/api/order/subscription`).then(data => {
        data.forEach(e => {
            $("#my-detail").append(SubscriptionDetail(
                    e.subscription,
                )) //Need to make the if statement for showing different subscription details for different plans
        });
    });

    $('s1').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/subscription', {
            "subscription": 1
        })
        .then(() => location.reload())
        .catch(err => console.log(err));
    })

    $('s2').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/subscription', {
            "subscription": 4
        })
        .then(() => location.reload())
        .catch(err => console.log(err));
    })

    $('s3').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/subscription', {
            "subscription": 12
        })
        .then(() => location.reload())
        .catch(err => console.log(err));
    })

});