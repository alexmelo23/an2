import { createContext } from "react";
import remotedev from "mobx-remotedev";
import { annotation } from "./annotation";
import { RouterStore } from "mobx-react-router";
import { reaction } from "mobx";

export class RootStore {
  annotationStore = remotedev(new annotation());
  routing = remotedev(new RouterStore());

  constructor() {
    reaction(
      () => JSON.stringify(this.annotationStore),
      json => {
        localStorage.setItem("store", json);
      },
      {
        delay: 500
      }
    );

    let json = localStorage.getItem("store");
    if (json) {
      Object.assign(this.annotationStore, JSON.parse(json));
    }
  }
}

export const RootStoreContext = createContext(new RootStore());
