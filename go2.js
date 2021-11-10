// этот файл надо будет дописать...

// не обращайте на эту функцию внимания
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
    //Regexp-s
    let regexp_method = /^[A-Z]+/ig;
    let regexp_uri = /(?<=\s)(\/[A-Za-z/S]*)/ig
    let regexp_headers = /^([\w\-]+):.+/igm
    let regexp_body = /\w+(?=(\=|\d))(?=(\&|\=)?)/ig

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
console.log(JSON.stringify(http, undefined, 2));
