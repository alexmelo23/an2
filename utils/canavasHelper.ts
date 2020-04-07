export default class canvasHelper {
  public makeCapture = (
    props: any,
    videoE: HTMLVideoElement,
    blob: boolean = false
  ) => {
    const { videoWidth, videoHeight } = props;
    var canvas: any = document.getElementById("canvas-img");
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoE, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/png");
    console.log("base64", base64);
    if (blob === true) {
      return this.dataURItoBlob(base64);
    } else {
      return base64;
    }
  };

  // Need fix it
  static calcNormalizedVideoPosition = (
    rect: any,
    event: any,
    points: boolean = false
  ) => {
    const evt = event.e;
    // const videoReac = rect.getBoundingClientRect();
    console.log("videoReac", rect.width);
    let x = points === false ? evt.clientX : evt.x;
    let y = points === false ? evt.clientY : evt.y;
    let xNormalized = (x - rect.left) / rect.width;
    let yNormalized = (y - rect.top) / rect.height;
    return [xNormalized, yNormalized];
  };

  public dataURItoBlob = (dataURI: string): Blob => {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    console.log("blob", blob);
    return blob;
  };
}
