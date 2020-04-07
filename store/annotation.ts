import axios from "axios";
import { observable, action, autorun } from "mobx";
import _ from "lodash";
import "../config";

export class annotation {
  @observable loading: boolean = true;
  @observable currentTime: number = 0;
  @observable videoTime: number = 0;
  @observable currentFrame: number = 0;
  @observable currentFileName: string = "";
  @observable currentFile: string = "";
  @observable videoWidth = 1920;
  @observable videoHeight = 1080;
  @observable fps: number = 0;
  @observable totalFrame: number = 0;

  // @observable file: string = "";
  // @observable metaData: any = "";
  // @observable files: any = [];
  // @observable labels: any = [];
  // @observable polygonSettingsDrawerToggle: boolean = false;
  // @observable scenesToggle: boolean = false;
  // @observable currentPolygonObject: any = ""; // still empty
  // @observable dataObjects: any = [];
  // @observable frameSelect: boolean = false;
  // @observable startScene: boolean = false;
  // @observable sceneObject: any = [];
  // @observable ratio: number = 0;
  // @observable currentScenesObject: object = {};
  // @observable userList: any = [];

  @action
  setLoading = (): void => {
    this.loading = !this.loading;
  };

  @action
  updateCurrentVideoData = (file: any): boolean => {
    this.setLoading();
    // this.openNotificationWithIcon("info", { message: "Load info metadata" });
    this.currentFile = "http://10.0.14.54:8000" + "/upload/" + file.name;
    this.fps = file.metadata.fps;
    this.currentFileName = file.name;
    this.videoWidth = file.metadata.resolution.w;
    this.videoHeight = file.metadata.resolution.h;
    return true;
  };

  @action
  updateDrawerToggle = (): void => {
    this.loading = !this.loading;
  };

  // @action
  // updateScenesToggle = () => {
  //   this.scenesToggle = !this.scenesToggle;
  // };

  @action
  fetchVideofiles = async () => {
    try {
      var result = await axios.get(`/files/list`);
      this.setLoading();
      return result.data;
    } catch (err) {
      return err;
    }
  };

  // @action
  // sceneHandler = (params: any) => {
  //   if (!params) {
  //     this.scenesToggle = true;
  //     this.currentScenesObject.endFrame = this.currentFrame;
  //     this.currentScenesObject.endTime = this.currentTime;
  //   } else {
  //     this.currentScenesObject.startFrame = this.currentFrame;
  //     this.currentScenesObject.startTime = this.currentTime;
  //   }
  //   this.startScene = params;
  // };

  // onHandlerSaveScenes = async (params: any) => {
  //   const object = Object.assign(this.currentScenesObject, params);
  //   const info = {
  //     user_id: object.user_id,
  //     file_id: this.currentFile._id,
  //     points: [],
  //     name: object.name,
  //     description: object.description,
  //     type: "scenes",
  //     end: object.endTime,
  //     begin: object.startTime,
  //     begin_frame: this.currentScenesObject.startFrame,
  //     end_frame: this.currentScenesObject.endFrame
  //   };
  //   var result = await this.saveUserFileProcessing(info);
  //   this.dataObjects.push(result);
  //   this.currentScenesObject = {};
  //   this.startScene = false;
  //   this.scenesToggle = false;
  // };

  // openNotificationWithIcon = (type: string, content: object): void => {
  //   notification[type]({
  //     message: content.message,
  //     description: content.description
  //   });
  // };

  // @action
  // reset = () => {
  //   this.currentTime = 0;
  //   this.videoTime = 0;
  //   this.polygonSettingsDrawerToggle = false;
  //   this.scenesToggle = false;
  // };

  @action
  updateVideoTime = (time: any): void => {
    this.videoTime = time;
    this.totalFrame = Math.round(this.videoTime * this.fps) - 1;
  };
  @action
  updateCurrentDataTime = (obj: any): void => {
    this.currentTime = obj.currentTime;
    this.currentFrame = obj.currentFrame;
  };

  // @action
  // loadFiles = async (e: any) => {
  //   this.loading = true;
  //   var result = await axios.get(`/files/list`, { key: e });
  //   this.files = result.data.data;
  //   this.loading = false;
  //   return true;
  // };

  // @action
  // loadLabels = async () => {
  //   this.loading = true;
  //   var result = await axios.get(`/labels`);
  //   this.labels = result.data.data;
  //   this.loading = false;
  //   return true;
  // };

  // @action
  // createLabels = async (params: object) => {
  //   var result = await axios.post(`/labels`, params);
  //   this.labels.push(result.data);
  //   return true;
  // };

  // @action
  // selectFile = async (id: string) => {
  //   // this.openNotificationWithIcon("info", { message: "Load info metadata" });
  //   this.loading = true;
  //   let file = toJS(_.find(this.files, { _id: id }));
  //   if (file) {
  //     this.currentFile = file;
  //     this.file = process.env.API_URI + "/upload/" + file.name;
  //     this.fps = file.metadata.fps;
  //     this.videoHeight = file.metadata.resolution.h;
  //     this.videoWidth = file.metadata.resolution.w;
  //     this.ratio = file.metadata.aspect.value;
  //     // this.loadAnnotationData({ file_id: id });
  //     // this.openNotificationWithIcon("success", {
  //     //   message: "Metadata loaded successfully"
  //     // });
  //     this.loading = false;
  //     return true;
  //   }
  // };

  // @action
  // updateframeSelect = (obj: any, bool: any) => {
  //   this.frameSelect = bool;
  // };

  // @action
  // addObject = async (obj: object) => {
  //   this.loading = true;
  //   let result;
  //   var formData = new FormData();
  //   formData.append("user_id", obj.user_id);
  //   formData.append("file_id", this.currentFile._id);
  //   formData.append("points", JSON.stringify(obj.points));
  //   formData.append("normalized_point", JSON.stringify(obj.normalized_point));
  //   formData.append("name", obj.name);
  //   formData.append("description", obj.description);
  //   formData.append("labelType", obj.labelType);
  //   formData.append("type", obj.type);
  //   formData.append("time", this.currentTime);
  //   formData.append("frame", this.currentFrame);
  //   formData.append("frame_img", obj.thumbnail);
  //   formData.append("binary_img", obj.binary_img);
  //   formData.append("canvas_width", obj.canvas_width);
  //   formData.append("metadata", toJS(this.currentFile.metadata.resolution));
  //   result = await this.saveAnnotationData(formData);

  //   this.dataObjects.push(result);
  //   this.loading = false;
  //   this.openNotificationWithIcon("success", {
  //     message: "Polygon created successfully"
  //   });
  //   return result;
  // };

  // @action
  // saveAnnotationData = async params => {
  //   var result = await axios.post(`/file-processing`, params);
  //   return result.data.data;
  // };

  // @action
  // updateAnnotationData = async params => {
  //   var result = await axios.put(`/file-processing`, params);
  //   return result.data.data;
  // };

  // updateAnnotationStoreData = async params => {};

  // @action
  // saveUserFileProcessing = async params => {
  //   var result = await axios.post(`/file-processing`, params);
  //   return result.data.data;
  // };

  // @action
  // loadAnnotationData = async params => {
  //   this.dataObjects = [];
  //   var result = await axios.post(`/file-processing/list`, params);
  //   if (result) {
  //     this.dataObjects = result.data.data;
  //   }
  // };

  // getUsersList = async params => {
  //   var result = await axios.get(`/user/list`, params);
  //   if (result) {
  //     this.userList = result.data;
  //   }
  // };

  // getUsersList = async params => {
  //   this.loading = true;
  //   var result = await axios.get(`/users`, params);
  //   if (result) {
  //     this.userList = result.data.data;
  //     this.loading = false;
  //   }
  // };

  // createUser = async params => {
  //   var result = await axios.post(`/register`, params);
  //   if (result) {
  //     this.getUsersList();
  //     this.loading = false;
  //     return result;
  //   }
  // };

  // deleteUser = async params => {
  //   this.loading = true;
  //   var result = await axios.delete(`/user`, { _id: params });
  //   if (result) {
  //     this.getUsersList();
  //     this.loading = false;
  //     return result;
  //   }
  // };
}
