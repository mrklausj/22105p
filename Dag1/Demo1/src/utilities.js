
const fs = require("fs");
const mimetypes = require("./mimetype.json");
const path = require("path");
const { rejects } = require("assert");
const { hrtime } = require("process");

exports.sendText = (res, msg, status = 200) => {
    res.statusCode = status;
    res.setHeader("Content-type", "text/plain");
    res.end(msg);
}

exports.sendJson = (res, msg, status = 200) => {
    res.statusCode = status;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(msg));
}

exports.sendFile = (res, filename) => {
    const ext = path.extname(filename);
    const mime = mimetypes[ext];
    fs.readFile(filename, (err, filecontent) => {
        if(err) {
            exports.sendJson(res, {msg: "Filen findes ikke"}, 404);
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-type", mime.type);
        res.end(filecontent);
    })

}

exports.logger = (req, res) => {
    const start = hrtime.bigint();
    let logStr = new Date().toISOString();
    logStr += ` ${req.method} ${req.url}`;
    res.on("finish", () => {
          const end = hrtime.bigint();
          console.log(Number(end - start)/1000000);
          logStr += ` ${res.statusCode} ${res.statusMessage} ${Number(end - start)/1000000}ms`;
          console.log(logStr);
    })

}

exports.redirect = (res, url) => {
    res.statusCode = 308;
    res.setHeader("Location", url);
    res.end();
}

exports.getbody = (req) => {
    let body = "";
    return new Promise((resolve, rejet) => {
        req.on("data", (chunk) => {
              body += chunk;
         });
         req.on("end", () => {
            try {
            body = JSON.parse(body)
            resolve(body);
            }
            catch(err) {
                rejects();
            }
         });
         req.on("error", () => {
            rejects("Fejl");
         });

    });
}