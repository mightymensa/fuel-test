<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-segment v-model="segmentValue" class="centered" mode="ios">
          <ion-segment-button value="cost">
            <ion-label>Cost Calculator</ion-label>
          </ion-segment-button>
          <ion-segment-button value="mileage">
            <ion-label>Mileage Calculator</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-card
          style="
             {
              display: flex;
              margin: 0 !important;
            }
          "
        >
          <div class="centered">
            <ion-card-content>
              <div class="result-heading-item">Fuel Price</div>
              <div class="result-main-item"><span class="param-unit">GH₵</span> {{ fuelPrice }}</div>
            </ion-card-content>
          </div>
        </ion-card>
        <div v-if="segmentValue == 'cost'">
          <div class="input centered">
            <ion-input type="number" fill="solid" label="Mileage (km)" label-placement="floating" v-model="inputMileage"></ion-input>
          </div>

          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item">Cost</div>
                <ion-icon class="info-icon" :icon="informationCircleOutline"> </ion-icon>
              </div>
              <div class="result-main-item"><span class="param-unit">GH₵</span> {{ calculatedCost }}</div>
              <div>
                <div class="mt result-heading-item">Volume</div>
                <ion-icon class="info-icon" :icon="informationCircleOutline"> </ion-icon>
              </div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>
        <div v-if="segmentValue == 'mileage'">
          <div class="input centered">
            <ion-input fill="outline" type="number" label="Amount (GH₵)" label-placement="floating" v-model="inputCost"></ion-input>
          </div>

          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item">Mileage</div>
                <ion-icon class="info-icon" :icon="informationCircleOutline"> </ion-icon>
              </div>
              <div class="result-main-item">{{ calculatedMileage }} <span class="param-unit">km</span></div>

              <div>
                <div class="mt result-heading-item">Volume</div>
                <ion-icon class="info-icon" :icon="informationCircleOutline"> </ion-icon>
              </div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="centered">
          <ion-button @click="clearPage" color="medium" style="width: 50%">Clear</ion-button>
          <ion-button
            :disabled="
              (segmentValue == 'mileage' && (inputCost < 1 || inputCost == 0)) || (segmentValue == 'cost' && (inputMileage < 1 || inputMileage == 0))
            "
            @click="calculate"
            style="width: 50%"
            >Calculate</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { informationCircleOutline } from "ionicons/icons";
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonLabel,
  IonCard,
  // IonCardSubtitle,
  // IonCardHeader,
  // IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { ref, inject, onBeforeUpdate } from "vue";

const StorageService = inject("StorageService") as {
  set: (key: string, value: number) => Promise<void>;
  get: (key: string) => Promise<any>;
  remove: (key: string) => Promise<void>;
};

const segmentValue = ref("cost");
const fuelPrice = ref();
const fuelEfficiency = ref();

onBeforeUpdate(async () => {
  await loadData();
});

const inputMileage = ref();
const calculatedCost = ref();
const inputCost = ref();
const calculatedMileage = ref();
const calculatedVolume = ref();

const loadData = async () => {
  fuelEfficiency.value = (await StorageService.get("fuelEfficiency")) || 0;
  fuelPrice.value = (await StorageService.get("fuelPrice")) || 0;
};

const calculate = async () => {
  await loadData();
  if (segmentValue.value == "cost") {
    calculatedCost.value = ((fuelPrice.value * inputMileage.value) / fuelEfficiency.value).toFixed(2);
    calculatedVolume.value = (calculatedCost.value / fuelPrice.value).toFixed(2);
  } else {
    calculatedMileage.value = ((inputCost.value * fuelEfficiency.value) / fuelPrice.value).toFixed(2);
    calculatedVolume.value = (inputCost.value / fuelPrice.value).toFixed(2);
  }
};

const clearPage = () => {
  inputMileage.value = "";
  calculatedCost.value = "";
  inputCost.value = "";
  calculatedMileage.value = "";
  calculatedVolume.value = "";
};

loadData();
</script>

<style scoped>
ion-toolbar {
  --min-height: 80px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

.container {
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
}

ion-button {
  /* --background: #93e9be;
  --background-hover: #9ce0be;
  --background-activated: #88f4be;
  --background-focused: #88f4be; */

  /* --color: blue; */

  --border-radius: 8px;
  /* --border-color: #000; */
  --border-style: solid;
  --border-width: 1px;

  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
}

.centered {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

div {
  width: 100%;
}

.parameter-title {
  min-height: 40px;
}

.input {
  border-bottom: 1px solid #eeeeee;
  font-size: 1.2rem;
  font-weight: 500;
  --color: var(--ion-text-color);
  padding: 16px;
  /* width: 80%;
  align-self: center; */
}

.mt {
  margin-top: 40px;
}

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

.param-unit {
  font-size: 0.9rem;
  color: #444444;
}
</style>
