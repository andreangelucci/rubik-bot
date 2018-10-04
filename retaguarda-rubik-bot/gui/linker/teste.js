function teste(){
    const {PythonShell} = require('python-shell')
    var path = require('path')
    var options = {
        scriptPath: path.join(__dirname, "../../engine/"),
        args: []
    }
    let teste = new PythonShell('teste.py', options)
    teste.on('message', function(message){
        swal("Opaa...", message, "success")
    })
}