
const { url } = require("inspector");
const utils = require("./utilities");
const config = require("./config/serverconfig.json");

const api = {
    "test" : require("./api/test")
}

//console.log(api);

module.exports = (req, res) => {
    utils.logger(req, res);

    const incoming = new URL(req.url, `${config.host}:${config.port}`);

    const endpoint = incoming.pathname;

    if(endpoint === "/") {
        utils.redirect(res, config.default_doc);
        return;
    }

    

    //console.log(incoming);

    const regex = /^\/(html|css|img|js)\/\w+\.(html|js|css|png|jpe?g|gif|tiff|bmp)$/;

    const rx = new RegExp("^\\/(html|css|img|js)\\/[-\\w]+\\.(html|js|css|png|jpe?g|gif|tiff|bmp)$");

    let match = endpoint.match(rx);

    if(match) {
        // hvis jeg er her er fundet et match
        utils.sendFile(res, config.public_root +match[0])
        return;
    }
    

   
    const regEx = /^\/api\/(?<route>\w+)(?<param>\/\d+)?$/;
    match= endpoint.match(regEx);
    if(match) {
        console.log(match);
        if(api[match.groups.route]) {
            // hvis jeg er her er der fundet et endpoint
           if( api[match.groups.route][req.method]){
            // hvis jeg er her er der en handler til metoden
            api[match.groups.route][req.method].handler(req, res, match.groups.param);
            return;
           }
           // hvis jeg er her er der ikke fundte en handler
           utils.sendJson(res, {msg: `Method ${req.method} not allowed`}, 405);
        }
        // hvis jeg er her er der fundet at match til API'et
    }


    utils.sendJson(res, { "message": `Resourcen '${endpoint}' findes ikke`}, 404);

    //console.log(match)

    // hvis jeg er her er der ikke fundet et match

    //utils.sendText(res, "Hilsen fra serveren");
    //utils.sendJson(res, { message: "Okay....."});
    

    //res.write("Hello Aolly");
    //res.end();
}