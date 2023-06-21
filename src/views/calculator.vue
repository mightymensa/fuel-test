<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar>
        <ion-segment v-model="segmentValue" class="centered" mode="ios">
          <ion-segment-button value="cost">
            <ion-label>Cost Calculator</ion-label>
          </ion-segment-button>
          <ion-segment-button value="distance">
            <ion-label>Distance Calculator</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <ion-label> Fuel Price</ion-label>
        <ion-text> ₵{{ fuelPrice }}/liter</ion-text>
        <div v-if="segmentValue == 'cost'">
          <div class="input">
            <ion-input type="number" fill="solid" label="Distance (km)" label-placement="floating" v-model="inputDistance"></ion-input>
          </div>

          <ion-card>
            <ion-card-content>
              <div class="result-heading-item">Cost</div>
              <div class="result-main-item"><span class="param-unit">GH₵</span> {{ calculatedCost }}</div>

              <div class="mt-2 result-heading-item">Volume</div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>
        <div v-if="segmentValue == 'distance'">
          <div class="input">
            <ion-input fill="outline" type="number" label="Amount (GH₵)" label-placement="floating" v-model="inputCost"></ion-input>
          </div>

          <ion-card>
            <ion-card-content>
              <div class="result-heading-item">Distance</div>
              <div class="result-main-item">{{ calculatedDistance }} <span class="param-unit">km</span></div>

              <div class="mt-2 result-heading-item">Volume</div>
              <div class="result-main-item">{{ calculatedVolume }} <span class="param-unit">liters</span></div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="centered">
          <ion-button @click="clearPage" color="medium" style="width: 50%">Clear</ion-button>
          <ion-button
            :disabled="
              (segmentValue == 'distance' && (inputCost < 1 || inputCost == 0)) ||
              (segmentValue == 'cost' && (inputDistance < 1 || inputDistance == 0))
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

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonText,
  IonLabel,
  IonIcon,
  IonCard,
  // IonCardSubtitle,
  // IonCardHeader,
  // IonCardTitle,
} from "@ionic/vue";
import { constructOutline } from "ionicons/icons";
import { ref, inject } from "vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    // eslint-disable-next-line vue/no-unused-components
    IonButtons,
    // eslint-disable-next-line vue/no-unused-components
    IonButton,
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonInput,
    // eslint-disable-next-line vue/no-unused-components
    IonText,
    IonLabel,
    // eslint-disable-next-line vue/no-unused-components
    IonIcon,
    IonCard,
    // IonCardHeader,
    // IonCardSubtitle,
    // IonCardTitle,
  },

  setup() {
    const StorageService = inject("StorageService") as {
      set: (key: string, value: number) => Promise<void>;
      get: (key: string) => Promise<any>;
      remove: (key: string) => Promise<void>;
    };

    const fuelPrice = ref();
    const fuelEfficiency = ref();

    const segmentValue = ref("cost");

    const inputDistance = ref(0);
    const calculatedCost = ref();
    const inputCost = ref(0);
    const calculatedDistance = ref();
    const calculatedVolume = ref();

    const calculate = async () => {
      await loadData();

      if (segmentValue.value == "cost") {
        calculatedCost.value = ((fuelPrice.value * inputDistance.value) / fuelEfficiency.value).toFixed(2);
        calculatedVolume.value = (calculatedCost.value / fuelPrice.value).toFixed(2);
      } else {
        calculatedDistance.value = ((inputCost.value * fuelEfficiency.value) / fuelPrice.value).toFixed(2);
        calculatedVolume.value = (inputCost.value / fuelPrice.value).toFixed(2);
      }
    };

    const loadData = async () => {
      fuelEfficiency.value = (await StorageService.get("fuelEfficiency")) || 0;
      fuelPrice.value = (await StorageService.get("fuelPrice")) || 0;
    };

    const clearPage = () => {
      inputDistance.value = 0;
      calculatedCost.value = 0;
      inputCost.value = 0;
      calculatedDistance.value = 0;
      calculatedVolume.value = 0;
    };

    loadData();

    return {
      constructOutline,
      segmentValue,
      fuelPrice,
      inputDistance,
      inputCost,
      calculatedCost,
      calculatedDistance,
      calculatedVolume,
      calculate,
      clearPage,
      loadData,
    };
  },
};
</script>

<style scoped>
ion-toolbar {
  /* --background: #19422d;
  --color: white;

  --border-color: #f24aec;
  --border-width: 4px 0;
  --border-style: double; */

  --min-height: 80px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
}

.default-spacing {
  margin: 10px;
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
.just-right {
  text-align: end;
}
ion-input {
  border-bottom: 1px solid #eeeeee;
  font-size: 1.2rem;
  font-weight: 500;
  color: #222222;
}
.mt-2 {
  margin-top: 40px;
}
.result-main-item {
  --color: var(--ion-text-color, #000);
  margin: 0px;
  padding: 0px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
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
