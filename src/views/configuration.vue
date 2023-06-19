<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border"
      >, IonButton
      <ion-toolbar class="centered-element">
        <ion-title>Setup</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Configuration</ion-title>
          </ion-toolbar>
        </ion-header>

        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <ion-card>
                <ion-card-header>
                  <span>
                    <ion-card-title>
                      <IonInput v-model="tankCapacity"></IonInput>
                    </ion-card-title>
                    <ion-icon :icon="pencilOutline" />
                  </span>

                  <!-- <ion-icon name="pencil-outline"></ion-icon> -->
                  <ion-card-subtitle>Tank Capacity</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content> liters </ion-card-content>
              </ion-card>
            </IonCol>
            <IonCol size="6">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>
                    <IonInput v-model="maxDistance"></IonInput>
                  </ion-card-title>
                  <ion-card-subtitle>Max Cruising Distance</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content> kilometers </ion-card-content>
              </ion-card>
            </IonCol>
          </IonRow>
          <IonRow>
            <ion-card>
              <ion-card-header>
                <ion-card-title> <IonInput v-model="fuelPrice"></IonInput> </ion-card-title>
                <ion-card-subtitle>Fuel Price</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content> ₵ per liter </ion-card-content>
            </ion-card>
          </IonRow>
                    <IonRow>
     <IonButtons>
          <IonButton expand="full" @click="saveConfig">Save</IonButton>
        </IonButtons>
          </IonRow>

        </IonGrid>
   
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { pencilOutline } from "ionicons/icons";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonText,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";
import ConfigService from "./services/config.service";

const fuelPrice = ConfigService.getFuelPrice();
const tankCapacity = ref(55);
const maxDistance = ref(425);
let fuelEfficiency = ref(maxDistance.value / tankCapacity.value);

const saveConfig = () => {
  ConfigService.setFuelPrice(fuelPrice.value);
  fuelEfficiency = ref(maxDistance.value / tankCapacity.value);
  ConfigService.setFuelEfficiency(fuelEfficiency.value);
};

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonList, IonText, IonLabel, IonGrid, IonRow, IonCol, IonButton },
  data() {
    return {
      pencilOutline,
      fuelPrice,
      tankCapacity,
      maxDistance,
      fuelEfficiency,
      saveConfig,
    };
  },
};
</script>

<style scoped>
.example-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* justify-content: center; */
  /* height: 100%; */
}

.square-input {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0;
  padding-top: 100%; /* Maintain a 1:1 aspect ratio for the square */
}

ion-input {
  width: 80%; /* Adjust the width of the input field as needed */
}

.container {
  /* background: rgb(22, 1, 61); */
  /* color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100%;
}

IonButtons{
  width:100%;
}

.centered-element {
  text-align: center;
}
</style>
