// Library for handling HTTP requests to Discord's REST API
const token = require("./token")

const requests = {

    token: token,
    base_url: "https://discord.com/api",
    options: {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
        },
    },

    request: async function (endpoint, method, body) {
        this.options.method = method || this.options.method 
        this.options.body = body || this.options.body

        let response = await fetch(this.base_url + endpoint, this.options)
        return response
    },

    viewresponse: function (response) {
        response = response || global.response
        console.log(response.url)
        console.log(response.status)
        console.log(response.statusText)
        response.json().then(response => {
            console.log(response)
        })
    },

    requestview: function (endpoint) {
        this.request(endpoint).then(this.viewresponse)
    },

}

module.exports = requests