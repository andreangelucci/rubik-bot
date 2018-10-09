exports.ziparImagens = function(dir, callback){
    const {PythonShell} = require('python-shell')
    var path = require('path')
    var options = {
        scriptPath: path.join(__dirname, "/../../engine/"),
        args: [dir]
    }
    // let zipPython = new PythonShell('zip_arquivos.py', options)
    PythonShell.run('zip_arquivos.py', options, function(err){
        if (err)
            throw err;
        callback()
    }).on('message', function(message){
         console.log(message)
    })
}