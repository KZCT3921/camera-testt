let currentFacingMode = "user"; // 最初は内カメラ
let stream;

async function startCamera() {
  if (stream) {
    // 前のカメラを停止
    stream.getTracks().forEach(track => track.stop());
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: currentFacingMode } },
      audio: false
    });

    const videoElement = document.getElementById("camera");
    videoElement.srcObject = stream;

  } catch (err) {
    console.error("カメラ取得に失敗:", err);
  }
}

function switchCamera() {
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
  startCamera();
}

// 初期カメラ起動
startCamera();

