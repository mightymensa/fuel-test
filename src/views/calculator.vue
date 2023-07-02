<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <div class="page-title">Calculator</div>
    <!-- <ion-header collapse="condense"  mode="ios">
      <ion-toolbar mode="ios">
        <ion-title mode="ios" size="large"> Calculator </ion-title>
      </ion-toolbar>
    </ion-header> -->

    <!-- <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar  mode="ios"> -->
        <ion-segment v-model="segmentValue" class="centered" mode="ios">
          <ion-segment-button value="cost">
            <ion-label><font-awesome-icon class="fc-blue" icon="fa-solid fa-money-bill" />Cost Calculator</ion-label>
          </ion-segment-button>
          <ion-segment-button value="mileage">
            <ion-label><font-awesome-icon class="fc-green" icon="fa-solid fa-tachometer-alt" />Mileage Calculator</ion-label>
          </ion-segment-button>
        </ion-segment>
      <!-- </ion-toolbar>
    </ion-header> -->

    <ion-content>

      <div id="fuel-info-header">
        <div>
          <div class="fuel-info-subtitle">Fuel Price</div>
          <div class="fuel-info-value"><span class="fuel-info-unit">GH₵</span> {{fuelPrice}} </div>
        </div>

      </div>


      <div class="container">
   
        <div v-if="segmentValue == 'cost'" class="mw-1">
          <div class="input centered">
         
            <ion-item class="centered" style="width: 100%;padding-block-start: 0px;--padding-start: 0px;
     --inner-padding-end: 0px;">
              <ion-label position="stacked" class="mylabel">Mileage (km)</ion-label>
              <ion-input type="number" placeholder="Enter Mileage" v-model="inputMileage" step="1"
                style="width: 100%;font-size: 1.4rem;"></ion-input>
            </ion-item>
          </div>

          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item"><font-awesome-icon class="fc-blue" icon="fa-solid fa-money-bill" />Cost</div>
              </div>
              <div class="result-main-item"><span class="param-unit">GH₵</span> {{ calculatedCost }}</div>
              <div>
                <div class="mt result-heading-item"><font-awesome-icon class="fc-orange" icon="fa-solid fa-fill-drip" />Volume</div>
              </div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>



        <div v-if="segmentValue == 'mileage'">
          <div class="input centered">
         
            <ion-item class="centered" style="width: 100%;padding-block-start: 0px;--padding-start: 0px;
     --inner-padding-end: 0px;">
              <ion-label position="stacked" class="mylabel">Amount (GH₵)</ion-label>
              <ion-input type="number" placeholder="Enter Amount" v-model="inputCost" step="1"
                style="width: 100%;font-size: 1.4rem;"></ion-input>
            </ion-item>
          </div>

          <ion-card>
            <ion-card-content>
              <div>
                <div class="result-heading-item"><font-awesome-icon class="fc-green" icon="fa-solid fa-tachometer-alt" />Mileage</div>
              </div>
              <div class="result-main-item">{{ calculatedMileage }} <span class="param-unit">km</span></div>

              <div>
                <div class="mt result-heading-item"><font-awesome-icon class="fc-orange" icon="fa-solid fa-fill-drip" />Volume</div>
              </div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="centered">
          <ion-button @click="clearPage" color="medium" style="width: 50%">Clear</ion-button>
          <ion-button :disabled="(segmentValue == 'mileage' && (inputCost < 1 || inputCost == 0 || inputCost == undefined)) ||
            (segmentValue == 'cost' && (inputMileage < 1 || inputMileage == 0 || inputMileage == undefined))
            " @click="calculate" style="width: 50%">Calculate</ion-button>
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

const inputMileage = ref();
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
    calculatedCost.value = ((fuelPrice.value * inputMileage.value) / fuelEfficiency.value).toFixed(2);
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

ion-content,ion-card, ion-input, ion-label, ion-header, ion-toolbar{
  --backgrjound:#ffffff;
  backgrokund:#ffffff;

}
ion-segment{
  colojr: black;
  --background-chemcked:white;
}
ion-toolbkar {
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
  padding-bottom: 0;
  height: 100%;
}

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
.mw-1{
      max-width: 400px;

}
ion-page{
    max-width: 400px;
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
ion-segment{
  margin-bottom: 20px;
}
.mt {
  margin-top: 40px;
}

.result-main-item {
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
}

label {
  font-size: 0.8rem;
  color: rgb(117, 117, 117);
}

.label-text-wrapper {
  font-size: larger;
}
div{
  color: #444444;
}
</style>
