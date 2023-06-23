<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar class="centered">
        <ion-title>Setup</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large"> Setup </ion-title>
          </ion-toolbar>
        </ion-header>
        <div>
          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item">Tank Capacity</div>
              </div>
              <div class="result-main-item">
                <ion-item>
                  <IonInput type="number" v-model="tankCapacity"></IonInput>
                  <ion-note slot="end">liters</ion-note>
                </ion-item>
              </div>
              <div>
                <div class="mt result-heading-item">Maximum Mileage</div>
              </div>
              <div class="result-main-item">
                <ion-item>
                  <IonInput type="number" v-model="maxMileage"></IonInput>
                  <ion-note slot="end">km</ion-note>
                </ion-item>
              </div>

              <div>
                <div class="mt result-heading-item">Fuel Price</div>
              </div>
              <div class="result-main-item">
                <ion-item>
                  <IonInput type="number" v-model="fuelPrice" step="1"></IonInput>
                  <ion-note slot="end">GH₵ / liter</ion-note>
                </ion-item>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <div class="centered">
          <ion-button color="medium" class="result-buttons" @click="clearData">Clear</ion-button>
          <ion-button id="save" class="result-buttons" @click="saveData">Save</ion-button>
          <ion-toast class="ion-toast" trigger="save" message="Saved!" :duration="3000" position="top" :icon="checkmarkCircleOutline"></ion-toast>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { checkmarkCircleOutline } from "ionicons/icons";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonInput,
  // IonGrid,
  // IonRow,
  // IonCol,
  IonButton,
  IonToast,
} from "@ionic/vue";
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

.result-heading-item {
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
}

.ion-toast {
  --border-color: rgb(0, 128, 0);
  --border-width: 50px;
  --font-weight: 600;
  --font-size: small;
  --color: rgb(16, 230, 16);
}

.mt {
  margin-top: 24px;
}
.container {
  /* background: rgb(22, 1, 61); */
  /* color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.result-buttons {
  /* --background: #93e9be;
  --background-hover: #9ce0be;
  --background-activated: #88f4be;
  --background-focused: #88f4be; */

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
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ion-input {
  /* border-bottom: 1px solid #ededed; */
  width: 100%;
  font-size: 1.5rem;
}
ion-item {
  width: 100%;
  padding: 5px;
  --padding-start: 2px;
}

div {
  width: 100%;
}
</style>
