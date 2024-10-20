// THIS FILE EXISTS PURELY FOR CONVENIENCE REASONS
// YOU SHOULDN'T USE IT FOR ANYTHING ELSE THAN QUICK TESTS IN REPL

let token = require("./token")

const base_url = "https://discord.com/api"
let options = {
    method: "GET",
    headers: {
        "Authorization": token
    },
}

async function request(endpoint) {
    let response = await fetch(base_url + endpoint, options)
    return response
}

function viewresponse(response) {
    response = response || global.response
    console.log(response.url)
    console.log(response.status)
    console.log(response.statusText)
    response.json().then(response => {
        console.log(response)
    })
}

function requestview(endpoint) {
    request(endpoint).then(viewresponse)
}