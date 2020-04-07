import axios from "axios";
import { observable, action } from "mobx";

class auth {
  @observable authenticated: Boolean = false;
  @observable error: string = "";
  @observable info: string = "";

  @action
  signUserIn = async (data: object) => {
    try {
      var result = await axios.post(`/authenticate`, data);
      const { success, message, info, token } = result.data;
      if (success === true) {
        localStorage.setItem("auth_jwt_token", token);
        // window.location = "/#dashboard";
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "auth_jwt_token"
        );
        this.authenticated = true;
        this.info = info;
      }
      return result;
    } catch (e) {
      this.error = "Server Error, try later";
      console.log("post error", e);
    }
  };

  @action
  signUserUp = async (userObj: object) => {
    try {
      var result = await axios.post(`/signup`, userObj);
      if (result) {
        localStorage.setItem("auth_jwt_token", result.data.token);
        // window.location = "/#dashboard";
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "auth_jwt_token"
        );
        this.authenticated = true;
      }
    } catch (e) {
      this.error = "Server Error, try later";
      console.log("post error", e);
    }
  };

  @action
  signUserOut = async () => {
    // var result = await axios.post(`/logout`, { token: localStorage.getItem('auth_jwt_token') });
    this.authenticated = false;
    this.info = "null";
    this.error = "null";
    localStorage.removeItem("auth_jwt_token");
  };
}

export default new auth();
