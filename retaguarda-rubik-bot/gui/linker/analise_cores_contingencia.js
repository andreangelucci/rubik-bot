exports.analisaCor = (arquivo) => {
    return new Promise(function(resolve){
        const {PythonShell} = require('python-shell')
        var path = require('path')
        var options = {
            scriptPath: path.join(__dirname, "/../../engine/"),
            pythonPath: "/usr/bin/python2.7",
            args: [arquivo]
        }
        PythonShell.run('analise_cores_contingencia.py', options, function(err){
            if (err){
                console.log(err);
                resolve(indefinido);
            }
        }).on('message', function(message){
            resolve(message);
        })
    });
}