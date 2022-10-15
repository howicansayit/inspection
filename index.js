let getDiscordInfo = () => {
    axios({
        method: 'GET',
        url: "https://discord.com/api/channels/848670696459993122/messages?limit=50",
        headers: {
            'authorization': localStorage.authorization
        },
    })
}

let reportGenerator = (channel) => {
    data = new FormData()
    // TODO: удалить script tag
    data.set("content", "report\n" + quill.root.innerHTML)
    return data
}

// let postReport = () => {
//     axios({
//         method: "POST",
//         url: "https://discord.com/api/channels/1026204385417633902/messages",
//         headers: {
//             'authorization': localStorage.authorization
//         },
//         data: reportGenerator(),
//     })
// }

let postWebhookDiscordMessage = () => {
    console.log(document.querySelector("#editor").innerHTML)

    // axios({
    //     method: 'GET',
    //     url: "https://discord.com/api/users/@me",
    //     headers: {
    //         'authorization': localStorage.authorization
    //     },
    // }).then((response) => {
    //     console.log(response.data)
    // })

    // axios({
    //     method: 'GET',
    //     url: "https://discord.com/api/guilds/947217342713184346/members/{user.id}",
    //     headers: {
    //         'authorization': localStorage.authorization
    //     },
    // }).then((response) => {
    //     console.log(response)
    // })

    // axios({
    //     method: "POST",
    //     url: "https://discord.com/api/webhooks/1023996851327877140/6WngvLGbvKdcIvNdqIQ2Ha4CuJ2ulqOKW9chUuHTkNyoqEcQ6--pz3jP2XEhoA1QlhdB",
    //     data: {
    //         "content": "dsda",
    //         "embeds": [
    //             {
    //                 "title": `Докладывает`
    //             }
    //         ]
    //     },
    // })
}


let viewReports = () => {
    axios({
        method: "GET",
        url: "https://discord.com/api/channels/1026204385417633902/messages?limit=100",
        headers: {
            'authorization': localStorage.authorization
        },
    }).then((response) => {
        data = response.data

        let reports = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].content.includes("report")) {
                console.log(data[i])
                reports.push(data[i])
                
            }
        }

        for (let i = 0; i < reports.length; i++) {
            let modals = document.getElementById("modals")
                modals.innerHTML = modals.innerHTML + `
                <div class="modal fade" id="exampleModalToggle${i}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title fs-5">Доклад ${data[i].author.username}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${data[i].content.slice(7)}
                            </div>
                            <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle${(i + 1) < reports.length ? i + 1 : 0}" data-bs-toggle="modal">Open second modal</button>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    })


    // axios({
    //     method: "GET",
    //     url: "https://discord.com/api/channels/1026204385417633902/messages?limit=100",
    //     headers: {
    //         'authorization': localStorage.authorization
    //     },
    // }).then((response) => {
    //     data = response.data
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].content == "report") {
    //             console.log(data[i])

    //             // data[i].attachments[0].url
    //             // axios({
    //             //     method: "POST",
    //             //     url: "http://cdn.discordapp.com/attachments/1026204385417633902/1026209470294003752/blob",
    //             // }).then((response) => {
    //             //     console.log(response)
    //             // })

    //             fetch("https://cdn.discordapp.com/attachments/1026204385417633902/1026209470294003752/blob", {
    //                 mode: "no-cors",
    //             }).then((res) => {
    //                     console.log(res)
    //                 }
    //             )
    //             // fetch("http://cdn.discordapp.com/attachments/1026204385417633902/1026209470294003752/blob", {
    //             //     headers: {
    //             //         "Host": "127.0.0.1:5500",
    //             //         "Access-Control-Allow-Origin": "*"
    //             //     }
    //             // })
    //         }
    //     }
    // })
}