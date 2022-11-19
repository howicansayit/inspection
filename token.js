if (await cookieStore.get("authorization") != undefined) {
    showMainPage()
} else {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken != null) {
        await cookieStore.set({
            name: "authorization",
            value: `${tokenType} ${accessToken}`,
            expires: Date.now() + 86400,
            sameSite: "strict" 
        });


        axios({
            method: 'GET',
            url: "https://discord.com/api/users/@me",
            headers: {
                'authorization': await cookieStore.get("authorization")
            },
        }).then(async (response) => {
            data = response.data
            localStorage.userData = JSON.stringify(data)

            axios({
                method: 'GET',
                url: `https://discord.com/api/v10/users/@me/guilds/947217342713184346/member`,
                headers: {
                    'authorization': await cookieStore.get("authorization")
                },
            }).then((response) => {
                data = response.data
                localStorage.inspectorData = JSON.stringify(data)

                showMainPage()
            })
        })
    } else {
        let hostname = window.location.hostname

        if (hostname == "howicansayit.github.io") {
            hostname = "howicansayit.github.io/inspection/"
        }

        window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=1031942540703825941&redirect_uri=https%3A%2F%2F${hostname}&response_type=token&scope=identify%20guilds%20guilds.members.read`)
    }
}

let delToken = async (e) => {
    await cookieStore.delete("authorization")

    window.location.reload()
}