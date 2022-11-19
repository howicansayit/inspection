let easyMDE = undefined
let postReport = undefined

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
                <textarea id="editor"></textarea>
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
    easyMDE = new EasyMDE({
        element: document.getElementById('editor'),
        autosave: {
            enabled: true,
            uniqueId: "userReportEdit",
            delay: 1000,
            submit_delay: 5000,
            text: "Autosaved: "
        },
        spellChecker: false,
    })

    postReport = async () => {
        // res = await eel.send_report_embed(localStorage.inspectorData, easyMDE.value())()
        let inspData = JSON.parse(localStorage.inspectorData)
        await axios({
            method: 'post',
            url: 'https://inspection-backend.vercel.app/api/inspector',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "description": easyMDE.value(),
                "author": {
                    "name": inspData.nick,
                    "icon_url": `https://cdn.discordapp.com/avatars/${inspData.user.id}/${inspData.user.avatar}`
                }
            }
        })
        console.log(JSON.parse(localStorage.inspectorData))
        document.getElementById("modalsGroup").innerHTML = ""
        document.getElementById("reportsCardsGroup").innerHTML = ""
        setTimeout(() => reloadReports(), 1000)
    }

    async function reloadReports() {
        let res = await axios({
            method: 'get',
            url: 'https://inspection-backend.vercel.app/api/inspector',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = res.data

        for (let i = 0; i < data.length; i++) {
            if (data[i].author.bot == true) {
                console.log(data[i])

                let sendDate = new Date(data[i].timestamp)
                sendDate = `${('0' + sendDate.getHours()).slice(-2)}:${('0' + sendDate.getMinutes()).slice(-2)}:${('0' + sendDate.getSeconds()).slice(-2)} ${('0' + sendDate.getDate()).slice(-2) + '/'
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
                        <div class="container">
                            <div class="row">
                                <div class="col-md-auto">
                                    <img src="${data[i].embeds[0].author.icon_url}" class="rounded-circle" alt="avatar" style="width: 45px">
                                </div>
                                <div class="col align-self-center">
                                    <p class="card-text" data-bs-toggle="modal" data-bs-target="#report${i}"><b>${data[i].embeds[0].author.name}</b>
                                </div>
                            </div>
                        </div>
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
                            <div class="modal-body text-break">
                                <textarea id="ta-report-${i}" class="editor-preview"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `
                document.getElementById("modalsGroup").appendChild(modalDiv)

                let renderReport = new EasyMDE({
                    element: document.getElementById(`ta-report-${i}`),
                    initialValue: data[i].embeds[0].description,
                    spellChecker: false,
                    autoRefresh: {
                        delay: 300
                    },
                    toolbar: false,
                    previewClass: 'editor-preview'
                })
                renderReport.togglePreview()

                document.getElementById("reportsCardsGroup").appendChild(reportCard)
            }
        }
    }

    let sendReportButton = document.getElementById("sendReportButton")
    sendReportButton.outerHTML =
        String.raw`
    <button class="btn btn-secondary mt-3" type="button" onclick="postReport()">
        Отправить отчёт
    </button>
    `

    reloadReports()
}