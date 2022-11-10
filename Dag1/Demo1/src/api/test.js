const utils = require("../utilities");
const dataService = require("../dataservice/testservice");

module.exports = {
    GET: {
        handler : (req, res, param) => {
            if(param) {
                param = param.replace("/","");
                dataService.getById(param)
                .then(data => {
                    utils.sendJson(res, {msg: "Test", method: req.method, param: param, data});
                })
                .catch(err => {
                    utils.sendJson(res, {msg: "Test", method: req.method, param: param, err: err.message});
                });
                return;
            }
            dataService.getAll()
            .then(data => {
                utils.sendJson(res, {msg: "Test", method: req.method, param:param, data});
            })
            .catch(err => {
                utils.sendJson(res, {msg: "Test", method: req.method, err: err.message});
            });
             
        }
    },

    POST: {
        handler : (req, res, param) => {
            if(param) {
                utils.sendJson(res, {msg: "Parameter not allowed here"}, 400);
                return;

                // param = param.replace("/","");
            }
            utils.getbody(req)
                .then(body => {
                    // console.log(body);
                    dataService.insert(body)
                    .then( result => {
                       utils.sendJson(res, {msg: "Test", method: req.method, result});
                    })
                    .catch(err => {
                        utils.sendJson(res, {msg: "Test", method: req.method, err: err.message});
                    });    
                })                 
            .catch(err => {
                utils.sendJson(res, err, 500);
            });
            
        }
    },

    PUT: {
        handler : (req, res, param) => {
            if(param) {
                param = param.replace("/","");
                utils.getbody(req)
                .then(body => {
                    dataService.update(param, body)
                    .then(result => {
                        utils.sendJson(res, {msg: "Test", method: req.method, param: param, body, result});
                    })
                    .catch(err => {
                        utils.sendJson(res, {msg: "Test", method: req.method, param: param, body, err: err.message});
                    });
                })
                .catch(err => {
                    utils.sendJson(res, {err: err.message}, 400);
                }) 
                return;
            }           
             utils.sendJson(res, {msg: "Parameter required"},400);
        }
    },

    DELETE: {
        handler: (req, res, param) => {
            if(!param) {
                utils.sendJson(res, {msg: "Parameter required"},400);
                return;
            }
            param = param.replace("/","")
            dataService.delete(param)
            .then(result => {
                utils.sendJson(res, {msg: "Test", method: req.method, param, result});
            })
            .catch(err => {
                utils.sendJson(res, {err: err.message}, 400);
            })
            
        }
    }
}