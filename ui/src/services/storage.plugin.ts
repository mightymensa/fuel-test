// storagePlugin.ts
import { App } from "vue";
import StorageService from "./storage.service";

export default {
  install(app: App): void {
    app.provide("StorageService", StorageService);
  },
};
