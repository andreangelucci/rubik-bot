const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const watsonRecognition = new VisualRecognitionV3({
  url: 'https://gateway.watsonplatform.net/visual-recognition/api',
  version: '2018-03-19',
  iam_apikey: 'MKUJInbtHNYUvnVqi8tVHSDatBL0fUwT12NK46PeAmvw'
});

module.exports.detectarCor = function(imgPath, classificador, callback){    
    var img = fs.createReadStream(imgPath);
    var classificador = [classificador];
    var porcentagem_minima = 0.6;
    var parametros = {
      images_file: img,
      classifier_ids: classificador,
      threshold: porcentagem_minima
    };
    watsonRecognition.classify(
      parametros, function(err, response){
        if (err)
          console.log(err)
        else {
          console.log(JSON.stringify(response, null, 2));
          callback(response)          
        }
      }
    )
}