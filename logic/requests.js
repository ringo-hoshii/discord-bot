// Library for handling HTTP requests to Discord's REST API
const token = require("../utilities/token")

const requests = {

    token: token,
    base_url: "https://discord.com/api",

    request: async function (endpoint, method, body) {
        let options = {
            method: "GET",
            headers: {
                "Authorization": token,
                //"Content-Type": "application/json",
            },
        }
        options.method = method || options.method
        options.body = body || options.body

        if (options.method !== "GET") {
            options.headers["Content-Type"] = "application/json"
        }

        let response = await fetch(this.base_url + endpoint, options)
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
