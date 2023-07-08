<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>

    <ion-content>
      <div class="page-title">Calculator</div>

      <div class="container" style="margin-top: 20px;">

        <ion-card>
          <ion-card-content>
            <div class="info-card-item">
              <div class="result-heading-item">Fuel Price
              </div>
              <div class="result-main-item">12.23 <span class="param-unit">GH₵</span> </div>
            </div>
            <div class="info-card-item">
              <div class="result-heading-item">Fuel Economy
              </div>
              <div class="result-main-item">2.23 <span class="param-unit">GH₵</span> </div>
            </div>

          </ion-card-content>
        </ion-card>
        <ion-segment v-model="segmentValue" class="centered" mode="ios">
          <ion-segment-button value="cost">
            <ion-label>Cost</ion-label>
          </ion-segment-button>
          <ion-segment-button value="mileage">
            <ion-label>Mileage</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-card>
          <ion-card-content id="calculator-input-div" class="center-items">
            <div id="calculator-input-group">

              <div v-if="inputMileage !== ''" :style="inputMileage !== '' ? 'display:block;' : 'display:none;'">{{
                segmentValue == 'cost' ? 'Enter Cost' : 'Enter Mileage' }}</div>
              <input id="calculator-input" class="custom-input" v-model="inputMileage" type="number"
                placeholder="Enter mileage in kilometers">
            </div>

          </ion-card-content>
        </ion-card>
        <div v-if="segmentValue == 'cosat'" class="mw-1a">

          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item"><font-awesome-icon class="fc-blue" icon="fa-solid fa-money-bill" />Cost
                </div>
              </div>
              <div class="result-main-item"><span class="param-unit">GH₵</span> {{ calculatedCost }}</div>
              <div>
                <div class="mt result-heading-item"><font-awesome-icon class="fc-orange"
                    icon="fa-solid fa-fill-drip" />Volume</div>
              </div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>



        <div v-if="segmentValue == 'mileagae'">

          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item"><font-awesome-icon class="fc-green"
                    icon="fa-solid fa-tachometer-alt" />Mileage</div>
              </div>
              <div class="result-main-item">{{ calculatedMileage }} <span class="param-unit">km</span></div>

              <div>
                <div class="mt result-heading-item"><font-awesome-icon class="fc-orange"
                    icon="fa-solid fa-fill-drip" />Volume</div>
              </div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="centered action-div">
          <button class="btn btn-secondary m-2" @click="clearPage" style="width: 50%">Clear</button>
          <button id="calculate-button" class="btn btn-primary m-2" :disabled="(segmentValue == 'mileage' && (inputCost < 1 || inputCost == 0 || inputCost == undefined)) ||
            (segmentValue == 'cost' && (+inputMileage < 1 || +inputMileage == 0 || inputMileage == undefined))
            " @click="calculate" style="width: 50%">Calculate</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
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
  IonCardContent,
} from '@ionic/vue';
import { ref, inject, onBeforeUpdate } from 'vue';

const StorageService = inject('StorageService') as {
  set: (key: string, value: number) => Promise<void>;
  get: (key: string) => Promise<any>;
  remove: (key: string) => Promise<void>;
};

const segmentValue = ref('cost');
const fuelPrice = ref();
const fuelEfficiency = ref();

onBeforeUpdate(async () => {
  console.log('inputCost', inputCost.value);
  await loadData();
});

const inputMileage = ref('');
const calculatedCost = ref();
const inputCost = ref();
const calculatedMileage = ref();
const calculatedVolume = ref();

const loadData = async () => {
  fuelEfficiency.value = (await StorageService.get('fuelEfficiency')) || 0;
  fuelPrice.value = (await StorageService.get('fuelPrice')) || 0;
};

const calculate = async () => {
  await loadData();
  if (segmentValue.value == 'cost') {
    calculatedCost.value = ((fuelPrice.value * +inputMileage.value) / fuelEfficiency.value).toFixed(2);
    calculatedVolume.value = (calculatedCost.value / fuelPrice.value).toFixed(2);
  } else {
    calculatedMileage.value = ((inputCost.value * fuelEfficiency.value) / fuelPrice.value).toFixed(2);
    calculatedVolume.value = (inputCost.value / fuelPrice.value).toFixed(2);
  }
};

const clearPage = () => {
  inputMileage.value = '';
  calculatedCost.value = '';
  inputCost.value = '';
  calculatedMileage.value = '';
  calculatedVolume.value = '';
};

loadData();
</script>

<style scoped>
ion-button {
  --border-radius: 8px;
  --border-style: solid;
  --border-width: 1px;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
}

.centered {
  margin-left: auto;
  margin-right: auto;
  max-width: 320px;
  width: 94%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mw-1 {
  max-width: 400px;
}

ion-page {
  max-width: 400px;
  background-color: #08a391;
}

div {
  width: 100%;
}

.parameter-title {
  min-height: 40px;
}

.input {
  border-bottom: 1px solid #eeeeee;
  font-size: 1.3rem;
  font-weight: 500;
  --color: var(--ion-text-color);
  padding: 16px;
  padding-bottom: 3px;

}

ion-segment {
  margin-bottom: 20px;
}

.mt {
  margin-top: 40px;
}

.result-main-item {
  color: rgb(94, 94, 94);
  font-size: 1.1rem;
  font-weight: 500;
}

.info-icon {
  float: right;
  margin-top: -15px;
}

.result-heading-item {
  font-size: 12px;
  font-weight: normal;
  color: rgb(146, 146, 146);
}

.param-unit {
  font-size: 0.9rem;
  font-weight: lighter;
  color: rgb(146, 146, 146);
}

#fuel-info-header {
  display: flex;
  text-align: left;
  width: fit-content;
  /* justify-content: space-between; */
  margin: auto;
  max-width: 320px;
  width: 94%;
}

#fuel-info-header * {
  text-align: center;
  width: fit-content;

}

.fuel-info-subtitle {
  font-size: 0.9rem;
  font-weight: 300;
  color: rgb(157, 157, 157);
  text-transform: uppercase;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 1px;
}

.fuel-info-value {
  margin-top: 2px;
  font-weight: bold;
  font-size: 1.7rem;
  color: rgb(63, 63, 63);
  letter-spacing: 1px;
}

.fuel-info-unit {
  font-size: 1rem;
  color: rgb(93, 93, 93);
  font-weight: 600;
}

ion-card {
  margin-top: 5px;
  border-radius: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

label {
  font-size: 0.8rem;
  color: rgb(117, 117, 117);
}

.label-text-wrapper {
  font-size: larger;
}

ion-segment {
  background: none;
  margin-top: 18px;
}

ion-segment-button {
  --indicator-color: rgb(211, 242, 232);
  /* --indicator-color: rgb(211, 242, 232); */
  --padding-top: 5px;
  --padding-bottom: 5px;
}

/* Material Design styles */
ion-segment-button.md {
  --color-checked: rgb(31, 200, 128);
  --indicator-height: 4px;
}

/* iOS styles */
ion-segment-button.ios {
  --color: rgb(94, 94, 94);
  --color-checked: rgb(31, 200, 128);
  --border-radius: 20px;
}

.fa-solid {
  display: none;
}

font-awesome-icon {
  display: none;

}

.info-card-item {
  border-left: 3px solid rgb(214, 90, 90);
  padding-left: 5px;
}

.info-card-item:not(:first-child){
  border-color: rgb(135, 204, 158);
}

.info-card-item:first-child{
  border-color: rgb(164, 235, 187);
}

.info-card-item:not(:first-child) {
  margin-top: 20px;
}

ion-item,
ion-input,
item-native,
item-label {
  border: none;
  align-items: center;
  text-align: center;
  --border-color: white;
  border: none;
  --border-width: 0px;
  --border-color: white;
}

.center-items {
  text-align: center;

}

#calculator-input-div {
  padding-top: 80px;
  padding-bottom: 80px;
}

.custom-input:focus {
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /* Firefox */
}

#calculator-input {
  font-size: 1.3rem;
  width: 100%;
  text-align: center;
  border: none;
}

#calculator-input-group {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Vertical alignment */
  justify-content: center;
}

.action-div {
  width: 70%;
}
</style>
