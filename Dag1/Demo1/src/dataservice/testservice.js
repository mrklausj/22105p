const dbh = require("../datasource/mysqldata");

exports.getAll = () => {
    return new Promise((succes,failure)=> {
        dbh.getAll()
        .then(data => {
            succes(data);
           // console.log(data);
        })
        .catch(err => {
           // console.log(err);
           failure(err)
        });
    });
    
}

exports.getById = id => {
    return new Promise((succes, failure)=> {
        dbh.getById(id)
        .then(data => {
            succes(data);
           // console.log(data);
        })
        .catch(err => {
           // console.log(err);
           failure(err)
        });
    });
}

exports.insert = jsonData => {
    return new Promise((succes, failure) => {
        dbh.insert(jsonData)
        .then(result => {
            succes(result);
        })
        .catch(err => {
            console.log(err);
            failure(err)
        });
    });
}

exports.update = (id, jsonData) => {
    return new Promise((succes, failure) => {
        dbh.update(id, jsonData)
        .then(result => {
            succes(result);
        })
        .catch(err => {
            failure(err);
        });
    });
}

exports.delete = (id) => {
    return new Promise((succes, failure) => {
        dbh.delete(id)
        .then(result => {
            succes(result);
        })
        .catch(err => {
            failure(err);
        });
    });
}