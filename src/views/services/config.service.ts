// sharedService.ts
import { ref } from "vue";

class ConfigService {
  private fuelPrice = ref(12.45);
  private fuelEfficiency = ref(7.73);

  setFuelPrice(fuelPrice: number): void {
    this.fuelPrice.value = fuelPrice;
  }

  setFuelEfficiency(fuelEfficiency: number): void {
    this.fuelEfficiency.value = fuelEfficiency;
  }

  getFuelPrice() {
    return this.fuelPrice;
  }

  getFuelEfficiency() {
    return this.fuelEfficiency;
  }
}

export default new ConfigService();
