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
window.addEventListener("orientationchange", () => {
  adjustVideoOrientation();
});

function adjustVideoOrientation() {
  const video = document.getElementById("camera");

  if (window.orientation === 180 || window.orientation === 0) {
    // 縦向き（自然）
    video.style.transform = currentFacingMode === "user" ? "scaleX(-1)" : "none";
  } else {
    // 横向き（回転対応、必要なら追加反転）
    video.style.transform = currentFacingMode === "user" ? "scaleX(-1) rotate(180deg)" : "none";
  }
}


// 初期カメラ起動
startCamera();

