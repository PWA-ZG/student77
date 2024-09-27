navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    var video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
  });

  document.getElementById('capture').addEventListener('click', function() {
    var canvas = document.getElementById('canvas');
    var video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    var img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    document.getElementById('photoContainer').appendChild(img);
  });