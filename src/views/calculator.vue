<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-segment v-model="segmentValue" class="centered">
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
            <ion-input fill="outline" label="Distance (km)" label-placement="floating" v-model="inputDistance"></ion-input>
          </div>

          <ion-card>
            <IonCardHeader>
              <IonCardSubtitle>Cost</IonCardSubtitle>
              <IonCardTitle>{{ calculatedCost }}</IonCardTitle>
            </IonCardHeader>
          </ion-card>

          <ion-card>
            <IonCardHeader>
              <IonCardSubtitle>Volume</IonCardSubtitle>
              <IonCardTitle>3.2L</IonCardTitle>
            </IonCardHeader>
          </ion-card>

          <IonButtons mode="ios">
            <IonButton>Clear</IonButton>
            <ion-button @click="calculateCost">Calculate</ion-button>
          </IonButtons>
        </div>
        <div v-if="segmentValue == 'distance'">
          <div class="input">
            <ion-input fill="outline" label="Amount (GH₵)" label-placement="floating" v-model="inputCost"></ion-input>
          </div>

          <ion-card>
            <IonCardHeader>
              <IonCardSubtitle>Distance</IonCardSubtitle>
              <IonCardTitle>{{ calculatedDistance }}</IonCardTitle>
            </IonCardHeader>
          </ion-card>

          <ion-card>
            <IonCardHeader>
              <IonCardSubtitle>Volume</IonCardSubtitle>
              <IonCardTitle>3.2L</IonCardTitle>
            </IonCardHeader>
          </ion-card>

          <IonButtons mode="ios">
            <IonButton>Clear</IonButton>
            <ion-button @click="calculateDistance">Calculate</ion-button>
          </IonButtons>
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
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { constructOutline } from "ionicons/icons";
import { ref } from "vue";

import ConfigService from "./services/config.service";

let fuelPrice = ConfigService.getFuelPrice();
let fuelEfficiency = ConfigService.getFuelEfficiency();

const segmentValue = ref("cost");

const inputDistance = ref();
const calculatedCost = ref();
const inputCost = ref();
const calculatedDistance = ref();

const calculateCost = () => {
  fuelPrice = ConfigService.getFuelPrice();
  fuelEfficiency = ConfigService.getFuelEfficiency();
  calculatedCost.value = ((fuelPrice.value * inputDistance.value) / fuelEfficiency.value).toFixed(2);
};

const calculateDistance = () => {
  const fuelPrice = ConfigService.getFuelPrice();
  const fuelEfficiency = ConfigService.getFuelEfficiency();
  calculatedDistance.value = ((inputCost.value * fuelEfficiency.value) / fuelPrice.value).toFixed(2);
};

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
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  },

  data() {
    return {
      constructOutline,
      segmentValue,
      fuelPrice,
      inputDistance,
      inputCost,
      calculateCost,
      calculateDistance,
      calculatedCost,
      calculatedDistance,
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
</style>
