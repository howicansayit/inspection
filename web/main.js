function showMainPage() {
    if (localStorage.authorization) {
        inspectorData = JSON.parse(localStorage.inspectorData)
        document.getElementById("main").innerHTML =
            String.raw`
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Добро пожаловать: ${inspectorData.nick}</h5>
                <p class="card-text">
                    Данная консоль поможет Вам удобнее отсылать рапорты и делать соответствующие отчёты.
                </p>
            </div>
        </div>
        `
    } else {
        document.getElementById("main").innerHTML =
            String.raw`
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                    Для начала авторизируйстесь используя <strong>discord</strong>.
                </p>
                <p class="card-text">
                    <i>Данные хранятся только <b>локально</b>. Автор не имеет доступа к вашей информации.</i>
                </p>
            </div>
        </div>
        `
    }
}