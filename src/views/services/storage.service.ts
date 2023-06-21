import { Storage } from "@ionic/storage";

const storage = new Storage();
await storage.create();

export default {
  async set(key: string, value: any): Promise<void> {
    await storage.create();
    await storage.set(key, value);
  },

  async get(key: string): Promise<any> {
    await storage.create();
    return await storage.get(key);
  },

  async remove(key: string): Promise<void> {
    await storage.remove(key);
  },
  // Tank Capacity

  // setTankCapacity(value: number): Promise<any> {
  //   return store.set("tankCapacity", value);
  // },

  // getTankCapacity(): Promise<any> {
  //   return store.get("tankCapacity");
  // },

  // removeTankCapacity(): Promise<any> {
  //   return store.remove("tankCapacity");
  // },

  // // Max Cruising Distance

  // setMaxDistance(value: number): Promise<any> {
  //   return store.set("maxDistance", value);
  // },

  // getMaxDistance(): Promise<any> {
  //   return store.get("maxDistance");
  // },

  // removeMaxDistance(): Promise<any> {
  //   return store.remove("maxDistance");
  // },

  // // Fuel Efficiency

  // setFuelEfficiency(value: number): Promise<any> {
  //   return store.set("fuelEfficiency", value);
  // },

  // getFuelEfficiency(): Promise<any> {
  //   return store.get("fuelEfficiency");
  // },

  // removeFuelEfficiency(): Promise<any> {
  //   return store.remove("fuelEfficiency");
  // },

  // // Fuel Price

  // setFuelPrice(value: number): Promise<any> {
  //   return store.set("fuelPrice", value);
  // },

  // getFuelPrice(): Promise<any> {
  //   return store.get("fuelPrice");
  // },

  // removeFuelPrice(): Promise<any> {
  //   return store.remove("fuelPrice");
  // },
};
