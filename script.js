async function startExternalCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" } },
      audio: false
    });

    const videoElement = document.getElementById("camera");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("外カメラの取得に失敗:", error);
    alert("外カメラが使えない端末か、アクセスが拒否されました。");
  }
}

startExternalCamera();
