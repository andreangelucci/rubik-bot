exports.resolverCubo = function(defString, callback){
    const {PythonShell} = require('python-shell')
    var path = require('path')
    var options = {
        scriptPath: path.join(__dirname, "/../../engine/"),
        pythonPath: "/usr/bin/python2.7",
        args: [defString]
    }
    // let zipPython = new PythonShell('zip_arquivos.py', options)
    PythonShell.run('algKociemba.py', options, function(err){
        if (err)
            callback(err);
    }).on('message', function(message){
        callback(null, message)
    })
}