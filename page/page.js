//
//
// TAKE NOTES:
// <HTMLelement>.inert = true
// makes an element inactive i.e. for the user it's just a dead non-interactive block like an image
//
// found that out accidentally by trying to access innerHTML
//


const token = "Bot MTEwNDY4NDUwNzIyNDg3OTIxNQ.GI7eqD.7erfzzHScGaQ3FuXUcYFp8tDGA93GwrQxMbeBk"
let tabbuttonsrelations = {
    "displayheaders": "headerslist",
    "displaybody": "requestbody",
}


let headerslist
let testheadername
let saveddata = JSON.parse(localStorage.getItem("headersvalues"))
let rows
let tabview

// fuck it's actually so bugging me rn
// this new "jj" and <leader>a moves
// im so confused when i don't complete jj and can't even undo it properly now because it's gonna
// undo the entire change
//
// EDIT: i actually can because it counts as a new insertion??
//
// EDIT 2: not it doesn't?
//
// like just now
// im gonna type something and quitju
// yeah u see it can't be undone if you.. or not?
// quit againj
// 
// no you just need to actually clean all this mess
//
// or i can remap it to enter insert mode again
// because right not it is mapped just to <Esc>
// but...
// if i...
// wait a minute
// it's not that easy
// wait wtf
// and i don't wanna use caps lock..
// so fucking confusing dude


function new_function(arg1, arg2) {
    let size = 10
    while (size < 10) {
	console.log(size)
	size++
    }
    // let's actually test it again

    // no it is fucking confusing af

    // maybe it'll go off with practice?..
    // so

    if (somekindofcondition) {
	dosomething(arguments, morearguments) // wow that's a keyword?

    }
}

function loadheaders() {
    headerslist = document.getElementById("headerslist")
    rows = headerslist.children

    let length = saveddata.length
    let i = 0

    while (i < length) {
	rows[i].getElementsByClassName("useheader")[0].checked = saveddata[i].useheader
	rows[i].getElementsByClassName("headername")[0].value = saveddata[i].headername
	rows[i].getElementsByClassName("headervalue")[0].value = saveddata[i].headervalue
	i++
    }
}

function test() {
    testheadername = document.getElementsByClassName("headername")[0]
    testheadername.value = 123
}

function body_onload() {
    headerslist = document.getElementById("headerslist")

    document.getElementById("addheader").onclick = addheader
    let headershtml = localStorage.getItem("headershtml")
    if (headershtml.search("[<>]") !== -1) {
	document.getElementById("headerslist").innerHTML = headershtml
    } else {
	addheader()
    }

    loadheaders()

    tabview = document.getElementById("tabview")
    let buttons = tabview.parentElement.getElementsByTagName("button")
    let length = buttons.length
    let i = 0
    while (i < length) {
        buttons[i].onclick = changetab
        i++
    }


    changetab()

    send()
}

function changetab(object) {
    if (object) {
        object = object.target
    } else {
        object = document.getElementById("displayheaders")
    }

    let buttons = object.parentElement.getElementsByClassName("tab")
    let i = 0
    while (i < buttons.length) {
        let classlist = buttons[i].classList
        if (!classlist.contains("tab-inactive")) {
            classlist.add("tab-inactive")
        }

        i++
    }

    object.classList.remove("tab-inactive")

    i = 0
    let tabs = tabview.children

    while (i < tabs.length) {
        if (tabs[i].id !== tabbuttonsrelations[object.id]) {
            tabs[i].classList.add("tabcontent-inactive")
        } else {
            tabs[i].classList.remove("tabcontent-inactive")
        }
        i++
    }
    
    tabbuttonsrelations[object.id]
}

function sendbtn_onclick() {
    send()
}

function send() {
    let url = get_request_url()
    let method = get_selected_method()
    let headers = get_headers()
    let body

    if (method !== "GET") {
        body = document.getElementById("requestbody").value
    }

    let options = {
        // method: method,
        headers: headers,
    }

    let response
    fetch(url, options).then(res => {
        response = res
        console.log(response)
    })

}

function get_request_url() {
    let requesturlelement = document.getElementById("requesturl")
    return requesturlelement.value
}

function get_selected_method() {
   return (document.querySelector('input[name="requestmethod"]:checked').value) 
}

function get_headers() {
    let headers = []

    let headerelements = document.getElementById("headerslist").children
    let length = headerelements.length
    let i = 0
    while (i < length) {
	let useheader = headerelements[i].getElementsByClassName("useheader")[0].checked
	if (!useheader) {
	    i++
	    continue
	}
	let headername = headerelements[i].getElementsByClassName("headername")[0].value
	let headervalue = headerelements[i].getElementsByClassName("headervalue")[0].value
	let header = {}
	header[headername] = headervalue
	headers.push(header)

	i++
    }

    if (headers.length === 0) {
	return null
    }

    i = 0
    let temp_updated_headers = {}
    for (i in headers) {
        for (j in Object.keys(headers[i])) {
           temp_updated_headers[Object.keys(headers[i])[j]] = Object.values(headers[i])[j]
        }
    }
    
    headers = temp_updated_headers

    return headers
}

function saveheaders() {
    let headerslist = document.getElementById("headerslist")
    let values = []
    let length = headerslist.children.length
    let i = 0
    while (i < length) {
	let child = headerslist.children[i]
	let data = {}
	data.useheader = child.getElementsByClassName("useheader")[0].checked
	data.headername = child.getElementsByClassName("headername")[0].value
	data.headervalue = child.getElementsByClassName("headervalue")[0].value
	values.push(data)
	i++
    }

    localStorage.setItem("headershtml", headerslist.innerHTML)
    localStorage.setItem("headersvalues", JSON.stringify(values))
}

function oldloadheaders() {
    let saveddata = JSON.parse(localStorage.getItem("headersvalues"))
    let headerslist = document.getElementById("headerslist")
    let rows = headerslist.children

    let length = saveddata.length
    console.log(length)
    let i = 0
    while (i < length) {
	let useheader = rows[i].getElementsByClassName("useheader")[0]
	let headername = rows[i].getElementsByClassName("headername")[0]
	let headervalue = rows[i].getElementsByClassName("headervalue")[0]

	useheader.checked = saveddata[i].useheader
	//headername.value = saveddata[i].headername
	headername.value = "123"
	headervalue.value = saveddata[i].headervalue

	rows[i].children[0].checked = saveddata[i].checked
	rows[i].children[1].value = saveddata[i].headersname

	i++
    }

}

function onheadersedited() {
    //console.log(document.getElementsByClassName("headername")[0].value)
    saveheaders()
}

function addheader(name, value) {
    let headernameplaceholder = "Authorization"
    let headervalueplaceholder = "Bot <TOKEN>"
    let headervaluevalue = token
    let headerslist = document.getElementById("headerslist")
    let lastchild = headerslist.children[headerslist.children.length - 1]
    let newchild = document.createElement("li")
    newchild.innerHTML = `
	<input type="checkbox" class="useheader" oninput="onheadersedited()" checked>
	<input class="headername" oninput="onheadersedited()" placeholder="${headernameplaceholder}" value="${headernameplaceholder}">
	<input class="headervalue" oninput="onheadersedited()" placeholder="${headervalueplaceholder}" value="${headervaluevalue}">
	<button class="deleteheader" onclick="deleteheader(this)">Delete</button>
    `
    headerslist.appendChild(newchild)
    onheadersedited()
}

function deleteheader(button) {
    button.parentElement.remove()
    onheadersedited()
}
