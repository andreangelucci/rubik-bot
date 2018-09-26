function startWebcam(){
  var video = document.getElementById("#videoElement");
 
if (navigator.mediaDevices.getUserMedia){       
  navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err0r) {
    console.log("Something went wrong!");
  });
}
}

function startWebcam3(){
  const wc = require('webcamjs')
  wc.set({
    width: 400,
    height: 400,
    image_format: 'jpeg',
    jpeg_quality: 90
  })
  wc.attach('camera')
}

function startWebcam2(){
    const cv = require('opencv4nodejs')
    const cap = new cv.VideoCapture('/dev/video0');
    let done = false;
    const intvl = setInterval(() => {
      let frame = cap.read();
      // loop back to start on end of stream reached
      if (frame.empty) {
        cap.reset();
        frame = cap.read();
      }
      //onFrame(frame);
  
      const key = cv.waitKey(10000);
      done = key !== -1 && key !== 255;
      if (done) {
        clearInterval(intvl);
        console.log('Key pressed, exiting.');
      }
    }, 0);
  };
