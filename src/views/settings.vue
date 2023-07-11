<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <div class="page-title">Settings</div>

    <ion-content :fullscreen="true">
      <div class="container">
        <ion-card mode="ios">
          <ion-card-content>
            <div class="info-item">
              <div class="info-item-heading">Tank Capacity</div>
              <div class="info-item-value text-lg">
                <input
                  v-model="tankCapacity"
                  placeholder="0"
                  class="setup-input"
                  id="tankCapacity"
                  @input="autoResize('tankCapacity')"
                  type="number"
                  style="width: 3ch"
                />
                <span class="info-item-unit">liters;</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-heading"><font-awesome-icon class="fc-blue" icon="fa-solid fa-tachometer-alt" />Maximum Mileage</div>
              <div class="info-item-value text-lg"><span class="info-item-unit">km;</span></div>
            </div>
            <div class="info-item">
              <div class="info-item-heading"><font-awesome-icon class="fc-blue" icon="fa-solid fa-money-bill" />Fuel Price</div>
              <div class="info-item-value text-lg"><span class="info-item-unit">GH&cent;</span></div>
            </div>

            <!-- <div>
                  <div class="result-heading-item mt-10"><font-awesome-icon class="fc-orange" icon="fa-solid fa-gas-pump" />Tank Capacity</div>
                </div>
                <div class="result-main-itema setup-parameter-item">
                  <input type="number" :disabled="tankCapacity>100000" v-model="tankCapacity" class="setup-parameter-input">
                  <span class="setup-parameter-unit">liters</span>
                </div>
      
                <div>
                  <div class="mt result-heading-item"><font-awesome-icon class="fc-green" icon="fa-solid fa-tachometer-alt" />Maximum Mileage</div>
                </div>
                <div class="result-main-itema setup-parameter-item">
                  <input type="number" :disabled="maxMileage>100000" name="" v-model="maxMileage" class="setup-parameter-input">
                  <span class="setup-parameter-unit">km</span>
                </div>

                <div>
                  <div class="mt result-heading-item"><font-awesome-icon class="fc-blue" icon="fa-solid fa-money-bill" />Fuel Price</div>
                </div>
                <div class="result-main-itema setup-parameter-item">
                  <input type="number" max="100" :disabled="fuelPrice>100000" name="" v-model="fuelPrice" class="setup-parameter-input">
                  <span class="setup-parameter-unit">GH₵ / liter</span>
                </div> -->
          </ion-card-content>
        </ion-card>
        <div class="centered">
          <button color="medium" class="btn btn-secondary m-2" @click="clearData" style="width: 50%">Clear</button>
          <button
            id="save"
            :disabled="maxMileage <= 0 || tankCapacity <= 0 || fuelPrice <= 0"
            class="btn btn-primary m-2"
            @click="saveData"
            style="width: 50%"
          >
            Save
          </button>
          <ion-toast class="ion-toast" trigger="save" message="Saved!" :duration="3000" position="top" :icon="checkmarkCircleOutline"></ion-toast>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { checkmarkCircleOutline } from "ionicons/icons";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonButton, IonToast } from "@ionic/vue";
import { ref, inject } from "vue";

const StorageService = inject("StorageService") as {
  set: (key: string, value: number) => Promise<void>;
  get: (key: string) => Promise<any>;
  remove: (key: string) => Promise<void>;
};

const tankCapacity = ref();
const maxMileage = ref();
const fuelEfficiency = ref();
const fuelPrice = ref();

const loadData = async () => {
  tankCapacity.value = (await StorageService.get("tankCapacity")) || 0;
  maxMileage.value = (await StorageService.get("maxMileage")) || 0;
  fuelEfficiency.value = (await StorageService.get("fuelEfficiency")) || 0;
  fuelPrice.value = (await StorageService.get("fuelPrice")) || 0;
};

const autoResize = async (id: string) => {
  const myvar = id == "tankCapacity" ? tankCapacity.value : id == "fuelPrice" ? fuelPrice.value : maxMileage.value;
  const element = document.getElementById(id);
  console.log(id == "tankCapacity", id, myvar, element?.style.width);
  if (element) {
    element.style.width = myvar.toString().length + 1 + "ch";
  }
};
const saveData = async () => {
  await StorageService.set("tankCapacity", tankCapacity.value);
  await StorageService.set("maxMileage", maxMileage.value);
  fuelEfficiency.value = maxMileage.value / tankCapacity.value;
  await StorageService.set("fuelEfficiency", fuelEfficiency.value);
  await StorageService.set("fuelPrice", fuelPrice.value);
};

const clearData = async () => {
  tankCapacity.value = "";
  maxMileage.value = "";
  fuelEfficiency.value = "";
  fuelPrice.value = "";
};

loadData();
</script>

<style scoped>
.result-main-item {
  /* --color: var(--ion-text-color, #000); */
  margin: 0px;
  padding: 0px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.info-icon {
  float: right;
  margin-top: -15px;
}

.ion-toast {
  --border-color: rgb(0, 128, 0);
  --border-width: 50px;
  --font-weight: 600;
  --font-size: small;
  --color: rgb(16, 230, 16);
}

.mt {
  margin-top: 35px;
}
.container {
  width: 90%;
  max-width: 400px;
  margin: auto;
  /* padding: 20px; */
}

.result-buttons {
  /* --color: blue; */
  width: 50%;
  --border-radius: 8px;
  /* --border-color: #000; */
  --border-style: solid;
  --border-width: 1px;

  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
}

.centered {
  text-align: center;
  width: 300px;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: space-between;
}

ion-input {
  /* border-bottom: 1px solid #ededed; */
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(27, 26, 26);
}
ion-item {
  width: 100%;
  padding: 5px;
  --padding-start: 2px;
}

.setup-parameter-item {
  display: flex;
  border-bottom: 1px solid rgb(206, 206, 206);
  margin-top: 10px;
}

.info-item:not(:first-child) {
  margin-top: 40px;
}
</style>
