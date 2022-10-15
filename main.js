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
                    Для начала авторизируйстесь используя <strong>token discord</strong>.
                </p>
                <p class="card-text">
                    <a href="https://discordhelp.net/discord-token">Как получить токен?</a>
                </p>
                <p class="card-text">
                    <i>Данные хранятся только <b>локально</b>. Автор не имеет доступа к вашему токену.</i>
                </p>
                <p class="card-text">
                    Не верите мне? Проверьте сами! <a href="https://github.com/howicansayit/inspection">Ссылка на исходный код
                        сайта.</a>
                </p>
            </div>
        </div>
        `
    }
}