exports.enviarSerial = function(str){
    return new Promise(function(resolve, reject){
        const {PythonShell} = require('python-shell')
        var path = require('path')
        var options = {
            scriptPath: path.join(__dirname, "/../../engine/"),
            pythonPath: "/usr/bin/python2.7",
            args: [
                process.env.PORTA_SERIAL,
                str
            ]
        }
        PythonShell.run('mensagemSerial.py', options, function(err){
            if (err)
                reject(err);
        }).on('message', function(message){
            resolve();
        })
    });
}