async function startExternalCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === "videoinput");

  // 外カメラらしき名前を探す
  const rearCamera = videoDevices.find(device => 
    device.label.toLowerCase().includes("back") ||
    device.label.toLowerCase().includes("rear")
  );

  const selectedDeviceId = rearCamera ? rearCamera.deviceId : videoDevices[0].deviceId;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: { exact: selectedDeviceId } },
    audio: false
  });

  const video = document.getElementById("camera");
  video.srcObject = stream;
}
