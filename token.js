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
            url: `https://discord.com/api/v10/users/@me/guilds/947217342713184346/member`,
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
} else {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken != null) {
        localStorage.authorization = `${tokenType} ${accessToken}`

        window.location.reload()
    }
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

var _0x1d7995 = _0x4377; function _0x4377(_0x56c9e8, _0x2a8306) { var _0x15fcec = _0x15fc(); return _0x4377 = function (_0x4377bf, _0x3f0beb) { _0x4377bf = _0x4377bf - 0xaa; var _0x5c1c33 = _0x15fcec[_0x4377bf]; return _0x5c1c33; }, _0x4377(_0x56c9e8, _0x2a8306); } (function (_0x597e14, _0x22a4f4) { var _0x39bb99 = _0x4377, _0xcdb7b5 = _0x597e14(); while (!![]) { try { var _0xd7cb6f = parseInt(_0x39bb99(0xaa)) / 0x1 + -parseInt(_0x39bb99(0xb3)) / 0x2 * (parseInt(_0x39bb99(0xaf)) / 0x3) + -parseInt(_0x39bb99(0xab)) / 0x4 + -parseInt(_0x39bb99(0xb4)) / 0x5 + parseInt(_0x39bb99(0xad)) / 0x6 * (-parseInt(_0x39bb99(0xb0)) / 0x7) + -parseInt(_0x39bb99(0xac)) / 0x8 + -parseInt(_0x39bb99(0xae)) / 0x9 * (-parseInt(_0x39bb99(0xb1)) / 0xa); if (_0xd7cb6f === _0x22a4f4) break; else _0xcdb7b5['push'](_0xcdb7b5['shift']()); } catch (_0x3f9578) { _0xcdb7b5['push'](_0xcdb7b5['shift']()); } } }(_0x15fc, 0x7c5ce), botToken = _0x1d7995(0xb2)); function _0x15fc() { var _0x33f40c = ['5578430HtTods', 'Bot\x20MTAzMTk0MjU0MDcwMzgyNTk0MQ.GDuJnG.aa6dwq0YCwHsyYD83I0JFudLvsJ6Y7amK1Rmpw', '924660OULprE', '610735KXuVBw', '698584jbQafx', '2948204jJFjiS', '3358232XWPnrU', '582222WUCHsn', '36MWxNmj', '3TwMdGZ', '49xRjuuA']; _0x15fc = function () { return _0x33f40c; }; return _0x15fc(); }