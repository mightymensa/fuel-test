<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable -->
<template>
  <ion-page>
    <IonHeader>
      <IonToolbar>
        <div class="page-title">Calculator</div>
        <ion-buttons slot="primary">
          <ion-button href="/about">
            <FontAwesomeIcon slot="icon-only" icon="fa fa-circle-info" class="menu-icon"></FontAwesomeIcon>
          </ion-button>
        </ion-buttons>
      </IonToolbar>
    </IonHeader>
    <ion-content>
      <ion-modal ref="modal" trigger="open-modal" @willPresent="getFuelPrice()">
        <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; margin: auto; color: rgb(94, 94, 94)">
          <div class="center-content">
            <div v-if="fuelPriceTemp !== ''" :style="fuelPriceTemp !== '' ? 'display:block;' : 'display:none;'">Enter Fuel Price in GH&cent;</div>
            <input
              id="fuel-price-input"
              v-model="fuelPriceTemp"
              type="number"
              placeholder="Enter Fuel Price in GH&cent;"
              :style="fuelPriceTemp === '' ? 'font-size: 1.1rem;' : 'font-size: 1.5rem;'"
            />
          </div>
          <div class="w-80 row mt-20">
            <button class="btn btn-secondary m-2 w-50" @click="dismissModal()">Cancel</button>
            <button class="btn btn-primary m-2 w-50" @click="saveFuelPrice()">Save</button>
          </div>
        </div>
      </ion-modal>

      <div class="container">
        <ion-card>
          <ion-card-content>
            <div class="info-item">
              <div class="info-item-heading">Fuel Price</div>
              <div class="info-item-value">{{ fuelPrice }} <span class="info-item-unit">GH&cent;</span></div>
              <font-awesome-icon id="open-modal" class="ion-item-action-icon" icon="fa fa-pen-to-square" />
            </div>
            <div class="info-item">
              <div class="info-item-heading">Fuel Economy</div>
              <div class="info-item-value">{{ fuelEfficiency }} <span class="info-item-unit">km/liter</span></div>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-segment v-model="segmentValue" class="centered" mode="ios" @ionChange="clearPage()">
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
              <div v-if="calculatorInput !== ''">
                {{ "Enter " + (segmentValue == "mileage" ? "cost in GH&cent;:" : "mileage in km:") }}
              </div>
              <input
                id="calculator-input"
                v-model="calculatorInput"
                type="number"
                :placeholder="'Enter ' + (segmentValue == 'mileage' ? 'cost in GHS:' : 'mileage in km:')"
                :style="calculatorInput === '' ? 'font-size: 1.1rem;' : 'font-size: 1.5rem;'"
              />
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="showResults == true">
          <ion-card-content id="calculator-result-div">
            <div v-if="segmentValue == 'cost'">
              <div>For a distance of {{ calculatorInput }} km, you would need an average of</div>
              <div class="info-item mt-10">
                <div class="info-item-heading">Volume</div>
                <div class="info-item-value text-lg">{{ calculatedVolume }} <span class="info-item-unit">liters</span></div>
              </div>
              <div class="mt-20 mb-20">which will cost</div>
              <div class="info-item">
                <div class="info-item-heading">Cost</div>
                <div class="info-item-value text-lg">{{ calculatedCost }} <span class="info-item-unit">GH&cent;</span></div>
              </div>
            </div>
            <div v-if="segmentValue == 'mileage'">
              <div>For an amount of {{ calculatorInput }} GH&cent;, you would get an average of</div>
              <div class="info-item mt-10">
                <div class="info-item-heading">Volume</div>
                <div class="info-item-value text-lg">{{ calculatedVolume }} <span class="info-item-unit">liters</span></div>
              </div>
              <div class="mt-10">and an additional mileage of</div>
              <div class="info-item">
                <div class="info-item-heading">Mileage</div>
                <div class="info-item-value text-lg">{{ calculatedMileage }} <span class="info-item-unit">km</span></div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <div v-if="showResults == false" class="centered">
          <button class="btn btn-secondary m-5 mb-10 w-50" @click="clearPage()">Clear</button>
          <button
            class="btn btn-primary m-5 mb-10 w-50"
            :disabled="+calculatorInput < 1 || +calculatorInput == 0 || calculatorInput == undefined"
            @click="calculate"
          >
            Calculate
          </button>
        </div>
        <div v-if="showResults == true" class="centered w-100 mb-10">
          <button class="btn btn-secondary m-2 w-100" @click="clearPage(false)">Back</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonButtons,
  IonButton,
  IonModal,
  modalController,
} from "@ionic/vue";
import { ref, inject, onBeforeUpdate } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const StorageService = inject("StorageService") as {
  set: (key: string, value: number) => Promise<void>;
  get: (key: string) => Promise<any>;
  remove: (key: string) => Promise<void>;
};

const segmentValue = ref("cost");
const fuelPriceTemp = ref();
const fuelPrice = ref();
const fuelEfficiency = ref();

const calculatorInput = ref("");
const calculatedVolume = ref();
const calculatedCost = ref();
const calculatedMileage = ref();
const showResults = ref(false);

onBeforeUpdate(async () => {
  await loadData();
});

const loadData = async () => {
  fuelEfficiency.value = parseFloat((await StorageService.get("fuelEfficiency")) || 0).toFixed(2);
  fuelPrice.value = parseFloat((await StorageService.get("fuelPrice")) || 0);
};

const getFuelPrice = () => {
  fuelPriceTemp.value = fuelPrice.value;
};

const saveFuelPrice = () => {
  fuelPrice.value = fuelPriceTemp.value;
  StorageService.set("fuelPrice", fuelPrice.value);
  modalController.dismiss();
};

const dismissModal = () => {
  modalController.dismiss();
};

const calculate = async () => {
  await loadData();
  if (segmentValue.value == "cost") {
    calculatedCost.value = ((+calculatorInput.value * fuelPrice.value) / fuelEfficiency.value).toFixed(2);
    calculatedVolume.value = (calculatedCost.value / fuelPrice.value).toFixed(2);
  } else {
    calculatedMileage.value = ((+calculatorInput.value * fuelEfficiency.value) / fuelPrice.value).toFixed(2);
    calculatedVolume.value = (+calculatorInput.value / fuelPrice.value).toFixed(2);
  }
  showResults.value = true;
};

const clearPage = (clearValues = true) => {
  if (clearValues) {
    calculatorInput.value = "";
    calculatedVolume.value = "";
    calculatedCost.value = "";
    calculatedMileage.value = "";
  }
  showResults.value = false;
};
</script>

<style scoped>
/* Element styles */

ion-page {
  max-width: 400px;
  background-color: #08a391;
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

/* ion-button {
  --border-radius: 8px;
  --border-style: solid;
  --border-width: 1px;
  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
} */

ion-card {
  margin-top: 5px;
  border-radius: 20px;
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

ion-segment {
  background: none;
  margin-top: 18px;
  margin-bottom: 20px;
}

ion-segment-button {
  --indicator-color: rgb(211, 242, 232);
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

/* Other styles */
.centered {
  margin-left: auto;
  margin-right: auto;
  max-width: 320px;
  width: 94%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.segment-button-indicator-background {
  box-shadow: none;
}

.info-item:not(:first-child) {
  margin-top: 20px;
}

.center-items {
  text-align: center;
}

#background-content {
  background-color: white;
}

#calculator-input-div {
  padding-top: 75px;
  padding-bottom: 75px;
  min-height: 250px;
}

#calculator-result-div {
  min-height: 250px;
}

#calculator-input,
#fuel-price-input {
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
</style>
