let currentFacingMode = "user"; // 初期は内カメラ
let stream;

async function startCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: currentFacingMode } },
      audio: false
    });

    const video = document.getElementById("camera");
    video.srcObject = stream;

    // ミラー反転（内カメラのみ）
    if (currentFacingMode === "user") {
      video.classList.add("mirror");
    } else {
      video.classList.remove("mirror");
    }

  } catch (error) {
    console.error("カメラ起動失敗:", error);
    alert("このカメラは使用できません");
  }
}

function switchCamera() {
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
  startCamera();
}

// 初回起動
startCamera();
