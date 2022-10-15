if (localStorage.authorization != undefined) {
    document.querySelector("#tokenInput").value = localStorage.authorization

    // document.querySelector("#userTitle").innerHTML = `
    // <div class="spinner-border" role="status">
    //     <span class="visually-hidden">Loading...</span>
    // </div>
    // `

    axios({
        method: 'GET',
        url: "https://discord.com/api/users/@me",
        headers: {
            'authorization': localStorage.authorization
        },
    }).then((response) => {
        data = response.data
        localStorage.userData = JSON.stringify(data) 
        
        axios({
            method: 'GET',
            url: `https://discord.com/api/guilds/947217342713184346/members/${data.id}`,
            headers: {
                'authorization': localStorage.authorization
            },
        }).then((response) => {
            data = response.data
            localStorage.inspectorData = JSON.stringify(data)

            // document.querySelector("#userTitle").innerHTML = 
            // `
            // Авторизован: ${data.nick}
            // `
        })
    })
}

let saveToken = (e) => {
    let token = document.querySelector("#tokenInput").value
    localStorage.authorization = token

    window.location.reload()
}

let delToken = (e) => {
    document.querySelector("#tokenInput").value = ""
    delete localStorage.authorization
    window.location.reload()
}