import { Storage } from "@ionic/storage";

const storage = new Storage();
await storage.create();

export default {
  async set(key: string, value: any): Promise<void> {
    await storage.set(key, value);
  },

  async get(key: string): Promise<any> {
    return await storage.get(key);
  },

  async remove(key: string): Promise<void> {
    await storage.remove(key);
  },
};
