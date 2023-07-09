<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable -->
<template>
  <ion-page>

    <ion-content>

      <ion-modal ref="modal" trigger="open-modal">
        <div style="display: flex;align-items: center;justify-content: center;flex-direction: column;margin: auto;">
          <div class="center-content">
            <div v-if="calculatorInput !== ''" :style="calculatorInput !== '' ? 'display:block;' : 'display:none;'">{{
              'Enter ' + (segmentValue == 'mileage' ? 'cost in GH&cent;' : 'mileage in km') }}</div>
            <input id="calculator-input" v-model="calculatorInput" type="number"
              placeholder="Enter Fuel Price in GH&cent;"
              :style="calculatorInput === '' ? 'font-size: 1.1rem;' : 'font-size: 1.5rem;'">
          </div>
          <div class="w-80 row" style="margin-top: 20px;">
            <button class="btn btn-secondary m-2 w-50">Cancel</button>
            <button id="calculate-button" class="btn btn-primary m-2 w-50">Save</button>
          </div>
        </div>
      </ion-modal>

      <div class="page-title">Calculator</div>

      <div class="container" style="margin-top: 20px;">

        <ion-card>
          <ion-card-content>
            <div class="info-item">
              <div class="info-item-heading">Fuel Price
              </div>
              <div class="info-item-value">{{ fuelPrice }} <span class="info-item-unit">GH&cent;</span> </div>
              <font-awesome-icon id="open-modal" class="fc-orange ion-item-action-icon" icon="fa-solid fa-pencil" />
            </div>
            <div class="info-item">
              <div class="info-item-heading">Fuel Economy
              </div>
              <div class="info-item-value">{{ fuelEfficiency }} <span class="info-item-unit">GH&cent;</span> </div>
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

        <ion-card v-if="showResults == false">
          <ion-card-content id="calculator-input-div" class="center-items">
            <div id="calculator-input-group">

              <div v-if="calculatorInput !== ''" :style="calculatorInput !== '' ? 'display:block;' : 'display:none;'">{{
                'Enter ' + (segmentValue == 'mileage' ? 'cost in GH&cent;' : 'mileage in km') }}</div>
              <input id="calculator-input" v-model="calculatorInput" type="number"
                :placeholder="'Enter ' + (segmentValue == 'mileage' ? 'cost in GHS' : 'mileage in km')"
                :style="calculatorInput === '' ? 'font-size: 1.1rem;' : 'font-size: 1.5rem;'">
            </div>

          </ion-card-content>
        </ion-card>
        <!-- <div v-if="segmentValue == 'cost' && showResults == true" class="mw-1a"> -->

        <ion-card v-if="showResults == true">
          <ion-card-content id="calculator-result-div">
            <div v-if="segmentValue == 'cost'" class="info-item mt-10">
              <div class="info-item-heading">Cost
              </div>
              <div class="info-item-value text-lg">{{ calculatedCost }} <span class="info-item-unit">GH&cent;</span>
              </div>
            </div>
            <div v-if="segmentValue == 'mileage'" class="info-item mt-10">
              <div class="info-item-heading">Mileage
              </div>
              <div class="info-item-value text-lg">{{ calculatedMileage }} <span class="info-item-unit">km</span> </div>
            </div>
            <div class="info-item mt-10">
              <div class="info-item-heading">Volume
              </div>
              <div class="info-item-value text-lg">{{ calculatedVolume }} <span class="info-item-unit">liters</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <div v-if="showResults == false" class="centered action-div">
          <button class="btn btn-secondary m-2 w-50" @click="clearPage()">Clear</button>
          <button id="calculate-button" class="btn btn-primary m-2 w-50" :disabled="(segmentValue == 'mileage' && (+calculatorInput < 1 || +calculatorInput == 0 || calculatorInput == undefined)) ||
            (segmentValue == 'cost' && (+calculatorInput < 1 || +calculatorInput == 0 || calculatorInput == undefined))
            " @click="calculate">Calculate</button>
        </div>
        <div v-if="showResults == true" class="centered w-100">
          <button class="btn btn-secondary m-2 w-100" @click="clearPage(false)">Back</button>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { faL } from '@fortawesome/free-solid-svg-icons';
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonContent,
  IonPage,
  IonSegment,

  IonSegmentButton,
  IonInput,
  IonModal,
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
const calculatorInput = ref('');
const calculatedMileage = ref();
const calculatedVolume = ref();
const showResults = ref(false);

const loadData = async () => {
  fuelEfficiency.value = parseFloat((await StorageService.get('fuelEfficiency')) || 0).toFixed(2);
  fuelPrice.value = parseFloat((await StorageService.get('fuelPrice')) || 0).toFixed(2);
};

const calculate = async () => {
  await loadData();
  if (segmentValue.value == 'cost') {
    calculatedCost.value = ((fuelPrice.value * +calculatorInput.value) / fuelEfficiency.value).toFixed(2);
    calculatedVolume.value = (calculatedCost.value / fuelPrice.value).toFixed(2);
  } else {
    calculatedMileage.value = ((+calculatorInput.value * fuelEfficiency.value) / fuelPrice.value).toFixed(2);
    calculatedVolume.value = (inputCost.value / fuelPrice.value).toFixed(2);
  }
  showResults.value = true;
};


const clearPage = (clear_values = true) => {
  if (clear_values) {

    inputMileage.value = '';
    calculatedCost.value = '';
    inputCost.value = '';
    calculatedMileage.value = '';
    calculatedVolume.value = '';
    calculatorInput.value = '';
  }
  showResults.value = false;
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




ion-card {
  margin-top: 5px;
  border-radius: 20px;
  /* padding-top: 10px;
  padding-bottom: 10px; */
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
  --indicator-box-shadow: none;
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

.segment-button-indicator-background {
  box-shadow: none;
}

.fa-solid {
  display: none;
}

font-awesome-icon {
  display: none;

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
  padding-top: 75px;
  padding-bottom: 75px;
  min-height: 250px;
}

#calculator-result-div {
  min-height: 250px;

}



#calculator-input {
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

.info-item:not(:first-child) {
  margin-top: 40px;
}

ion-modal {
  --background: white;
  margin: auto;
  --width: 80%;
  --max-width: 350px;
  --height: 30%;
  --min-height: 50px;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}

#background-content {
  background-color: white;
}
</style>
