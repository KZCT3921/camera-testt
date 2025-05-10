navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.getElementById('camera');
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('カメラ起動失敗:', err);
  });
