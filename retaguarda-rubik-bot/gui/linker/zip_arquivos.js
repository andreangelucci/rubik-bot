exports.ziparImagens = function(dir, path, callback){
    const {PythonShell} = require('python-shell')
    var path = require('path')
    var options = {
        scriptPath: path.join(__dirname, "/../../engine/"),
        args: [dir, path]
    }
    // let zipPython = new PythonShell('zip_arquivos.py', options)
    PythonShell.run('zip_arquivos.py', options, function(err){
        if (err)
            throw err;
        callback()
    })
    // zipPython.on('message', function(message){
    //     console.log('zipou')
    // })
}