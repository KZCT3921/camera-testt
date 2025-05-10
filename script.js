async function startCamera() {
  try {
    const constraints = {
      video: { facingMode: { ideal: "environment" } },
      audio: false
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.getElementById("camera");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("カメラの取得に失敗:", error);
    alert("カメラへのアクセスが拒否されました。");
  }
}
startCamera();
