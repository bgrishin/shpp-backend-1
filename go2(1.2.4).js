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

    let status
    let result
    let check = false

    //Check content-type
    for(let i = 0; i < headers.length; i++) {
        if(headers[i].indexOf('application/x-www-form-urlencoded') >= 0) {
            check = true;
            break
        }
    }

    //Check uri
    const tested_method = /^\/api/gi.test(uri)
    const tested_numbers = /(?<=\/api)\/checkLoginAndPassword/gi.test(uri)

    switch (method, tested_method, tested_numbers, check) {
        case method !== 'POST' || !tested_method || !tested_numbers:
            status = '400 Bad request'
            result = ''
            break;

        default:
            let content;
            try {
                content = require("fs").readFileSync("passwords.txt").toString()
            }catch (e) {
                result = 'file doesn\'t exist.'
                status = '500 Internal Server Error'
                break;
            }
            const password = body.split('&')[1].split('password=')[1]
            const login = body.split('&')[0].split('login=')[1]
            let splitted = content.split('\n')
            for(let i = 0; i < splitted.length; i++) {
                splitted[i] = splitted[i].replace(/\r/g, '')
            }
            console.log(splitted)
            for(let i = 0; i < splitted.length; i++) {
                const temp_pass = splitted[i].split(":")[1],
                      temp_log = splitted[i].split(":")[0]
                if(temp_log === login && temp_pass === password) {
                    result = '<h1 style="color:green">FOUND</h1>'
                    status = '200 OK'
                    break;
                }else{
                    result = 'access denied'
                    status = '403 Forbidden'
                }
            }
            break;
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
processHttpRequest(http.method, http.uri, http.headers, http.body);
