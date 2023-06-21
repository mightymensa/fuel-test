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
            <ion-title size="large">Setup</ion-title>
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
                  </span>

                  <ion-card-subtitle>liters</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content class="parameter-subtitle"> Tank Capacity </ion-card-content>
              </ion-card>
            </IonCol>
            <IonCol size="6">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>
                    <IonInput v-model="maxDistance"></IonInput>
                  </ion-card-title>
                  <ion-card-subtitle>kilometers</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content class="parameter-subtitle">Max Cruising Distance</ion-card-content>
              </ion-card>
            </IonCol>
          </IonRow>
          <IonRow>
            <ion-card style="margin-top: 2px">
              <ion-card-header>
                <ion-card-title> <IonInput v-model="fuelPrice"></IonInput> </ion-card-title>
                <ion-card-subtitle>₵ per liter</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content> Fuel Price </ion-card-content>
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
import ConfigService from "./services/storage.service";

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
}

.square-input {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0;
  padding-top: 100%; /* Maintain a 1:1 aspect ratio for the square */
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

IonButtons {
  width: 100%;
}

.centered {
  text-align: center;
}

ion-input {
  border-bottom: 1px solid #ededed;
  width: 100%;
}
.parameter-subtitle {
  min-height: 60px;
}
</style>
