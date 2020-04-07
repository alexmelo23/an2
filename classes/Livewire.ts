import Socket from "../classes/Socket";

export interface IstartLivewire {
  user_id: string;
  video_id: string;
  frame_time: number;
  index: number;
  inference_displayed: boolean;
}

export default class Livewire extends Socket {
  public io: any;
  public requests: Array<any> = [];
  public isPending: boolean = false;
  public currentLead: any = [];
  public constructor() {
    super();
    this.io = Socket.connected();
    // console.log("socket contect", this.io);
  }

  startLiveWire = async (
    captureCurrentFrame: string,
    frameProps: IstartLivewire,
    x: number,
    y: number
  ) => {
    new Promise(async (resolve, reject) => {
      this.io.emit(
        "startAnnotation",
        captureCurrentFrame,
        frameProps,
        (data: any) => {
          resolve(data);
        }
      );
    });
    await this.startLivePath(x, y);
  };

  startLivePath = async (x: number, y: number) => {
    return new Promise((resolve, reject) => {
      this.io.emit("startPath", x, y, (data: any) => {
        resolve(data);
      });
    });
  };

  updateLivePath = async (x: number, y: number) => {
    return new Promise((resolve, reject) => {
      this.io.emit("updatePath", x, y, (lead: any, path: any) => {
        resolve({ lead: lead, path: path[0] });
      });
    });
  };

  request = async (name: string, ...params: any) => {
    let req = {
      name: name,
      params: params
    };
    if (req.name === "startLead") {
      let requestsLength = this.requests.length;
      if (
        requestsLength > 0 &&
        this.requests[requestsLength - 1].name === req.name
      )
        this.requests.pop();
    }

    this.requests.push(req);
    return await this.handleNextRequest();
  };

  handleNextRequest = async () => {
    if (this.isPending) {
      return;
    } else {
      return new Promise((resolve, reject) => {
        if (this.requests.length > 0) {
          this.isPending = true;
          let req = this.requests.shift();
          this.io.emit(req.name, ...req.params, (lead: any, path: any) => {
            resolve({ lead: lead, path: path[0] });
          });
        }
      });
    }
  };
}
