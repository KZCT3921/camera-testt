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

  if (window.orientation === 90 || window.orientation === -90) {
    // 横向き（landscape）
    if (currentFacingMode === "user") {
      video.style.transform = "scaleX(-1) rotate(180deg)";
    } else {
      video.style.transform = "rotate(0deg)";
    }
  } else {
    // 縦向き（portrait）
    if (currentFacingMode === "user") {
      video.style.transform = "scaleX(-1)";
    } else {
      video.style.transform = "none";
    }
  }
}


window.addEventListener("orientationchange", adjustVideoOrientation);




// 初期カメラ起動
startCamera();

