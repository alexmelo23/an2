import axios from "axios";
import { Modal } from "antd";

process.env.API_URI = "http://10.0.14.54:8000/v1/";
const ROOT_URL = process.env.API_URI || "http://10.0.14.54:8000/v1/";

axios.defaults.baseURL = ROOT_URL;

axios.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhtYWxpbjIzQGdtYWlsLmNvbSIsImlhdCI6MTU4MDkxNTI3MSwiZXhwIjoxNTgwOTE4ODcxfQ.3uh2wjvI3b7a-LjfZ9S3RBWIYk29rim53Tw042K_s2c";

// if (localStorage.getItem("auth_jwt_token")) {
//   axios.defaults.headers.common["Authorization"] = localStorage.getItem(
//     "auth_jwt_token"
//   );
// }

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.response.use(
  function(response) {
    if (response.data.auth === false) {
      Modal.error({
        title: "Session expired",
        content: "Session expired, please login again"
      });
    }

    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
