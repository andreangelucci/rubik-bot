//carrega as variaveis  de ambiente
require('dotenv').load();

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const watsonRecognition = new VisualRecognitionV3({
  url: 'https://gateway.watsonplatform.net/visual-recognition/api',
  version: '2018-03-19',
  iam_apikey: process.env.WATSON_API_KEY
});

module.exports.detectarCor = function(imgPath, classificador, callback){    
    // callback(
    //   JSON.parse(
    //     `
    //     {
    //       "images": [
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "azul",
    //                   "score": 0.911
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p5.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "verde",
    //                   "score": 0.91
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p8.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "amarelo",
    //                   "score": 0.895
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p3.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "azul",
    //                   "score": 0.909
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p2.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "laranja",
    //                   "score": 0.909
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p6.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "branco",
    //                   "score": 0.89
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p0.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "azul",
    //                   "score": 0.91
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p1.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "branco",
    //                   "score": 0.908
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p4.png"
    //         },
    //         {
    //           "classifiers": [
    //             {
    //               "classifier_id": "DefaultCustomModel_527294892",
    //               "name": "Default Custom Model",
    //               "classes": [
    //                 {
    //                   "class": "branco",
    //                   "score": 0.862
    //                 }
    //               ]
    //             }
    //           ],
    //           "image": "face_cubo.zip/p7.png"
    //         }
    //       ],
    //       "images_processed": 9,
    //       "custom_classes": 6
    //     }        
    //     `
    //   )
    // )
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