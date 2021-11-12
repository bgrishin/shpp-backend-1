function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }
    return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    const time = new Date()
    let text = `                HTTP/1.1 ${statusCode}
                Date: ${time.toUTCString()}
                Server: Apache/2.2.14 (Win32)
                Content-Length: ${body.length}
                `
    for(let i = 0; i < headers.length; i++) {
        text += `${headers[i].join(": ")}
                `
    }
    text += `
                Result: ${statusMessage}`
    console.log(text)
}
function processHttpRequest(method, uri, headers, body) {
    const tested_sum = /^\/sum/g.test(uri)
    const tested_numbers = /(?<=\/sum)\?nums=/g.test(uri)
    let status
    let result

    const regexp = /(\d+)+/g

    if(method === "GET" && tested_sum && tested_numbers) {
        result = uri.match(regexp).map(Number).reduce((a,b) => a + b)
        status = "200 OK"
    }
    if(method === "GET" && !tested_sum) {
        result = "not found"
        status = "404 Not found"
    }
    if(method === "GET" && tested_sum && !tested_numbers) {
        result = ""
        status = "400 Bad Request"
    }
    outputHttpResponse(status, result, headers, body);
}

function parseTcpStringAsHttpRequest(string) {
    //Regexp-s
    let regexp_method = /^[A-Z]+/ig;
    let regexp_uri = /(?<=\s)(\/[A-Za-z\=\+\-\,\?\d+/S]*)/ig
    let regexp_headers = /^([\w\-]+):.+/igm
    // let regexp_body = /\w+(?=(\=|\d))(?=(\&|\=)?)/ig

    //Ставим значения
    let method = string.match(regexp_method)
    let uri = string.match(regexp_uri)
    let body = string.split('\n\n')[1] || ""
    let headers = []

    let trustedheaders = string.match(regexp_headers)

    //Настраиваем Headers
    for(let i = 0; i < trustedheaders.length; i++) {
        headers.push(trustedheaders[i].split(": "))
    }
    return {
        method: method.join(""),
        uri: uri.join(""),
        headers: headers,
        body: body.split("\n")[0],
    };
}

http = parseTcpStringAsHttpRequest(contents);
proces
