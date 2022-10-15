let quill = NaN
let postReport = NaN

function showReportsPage() {
    document.getElementById("main").innerHTML =
        String.raw`
    <h4>Отчёты деятельности</h4>
    <div class="card mb-3">
        <div class="card-body">
            <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#reportWriter"
                aria-expanded="false" aria-controls="reportWriter" style="width: 100%">
                Написать отчёт
            </button>
    
            <div class="collapse mt-3" id="reportWriter">
                <div id="editor"></div>
                <div id="sendReportButton">
    
                </div>
            </div>
        </div>
    </div>
    <div id="reportsCardsGroup" class="row row-cols-1 row-cols-md-2 g-4">
    </div>
    <div id="modalsGroup">
    
    </div>
    `

    quill = new Quill('#editor', {
        modules: {
            'history': {
                'userOnly': true,
                'toolbar': '#toolbar',
            },
            'syntax': true
        },
        theme: 'snow',
    });

    postReport = () => {
        axios({
            method: "POST",
            url: "https://discord.com/api/channels/1026204385417633902/messages",
            headers: {
                "authorization": localStorage.authorization,
                "Content-Type": "application/json"
            },
            data: {
                "content": "report\n" + quill.root.innerHTML
            },
        })
        document.getElementById("modalsGroup").innerHTML = ""
        document.getElementById("reportsCardsGroup").innerHTML = ""
        setTimeout( () => reloadReports(), 1000)
    }

    let sendReportButton = document.getElementById("sendReportButton")
    sendReportButton.outerHTML =
        String.raw`
    <button class="btn btn-secondary mt-3" type="button" onclick="postReport()">
        Отправить отчёт
    </button>
    `

    function reloadReports() {
        axios({
            method: "GET",
            url: "https://discord.com/api/channels/1026204385417633902/messages?limit=100",
            headers: {
                'authorization': localStorage.authorization
            },
        }).then((response) => {
            data = response.data

            for (let i = 0; i < data.length; i++) {
                if (data[i].content.includes("report")) {
                    console.log(data[i])

                    let sendDate = new Date(data[i].timestamp)
                    sendDate = `${('0' + sendDate.getHours()).slice(-2)}:${('0' + sendDate.getMinutes()).slice(-2)} ${('0' + sendDate.getDate()).slice(-2) + '/'
                        + ('0' + (sendDate.getMonth() + 1)).slice(-2) + '/'
                        + sendDate.getFullYear()}`

                    let modalDiv = document.createElement("div")

                    let reportCard = document.createElement("div")
                    reportCard.classList.add('col')
                    reportCard.innerHTML =
                        String.raw`
                    <div class="card">
                        <div class="card-header">
                            Отчёт от:
                        </div>
                        <div class="card-body">
                            <p class="card-text" data-bs-toggle="modal" data-bs-target="#report${i}"><b>${data[i].author.username}</b></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Дата отправки: ${sendDate}</small>
                        </div>
                    </div>
                    `

                    modalDiv.innerHTML =
                        String.raw`
                    <div class="modal" id="report${i}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-body">
                                    ${data[i].content.slice(7)}
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    document.getElementById("modalsGroup").appendChild(modalDiv)
                    document.getElementById("reportsCardsGroup").appendChild(reportCard)
                }
            }
        })
    }
    reloadReports()
}