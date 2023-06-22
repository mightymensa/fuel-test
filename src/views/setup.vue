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

                    <ion-card-subtitle class="parameter-title"> Tank Capacity </ion-card-subtitle>
                  </ion-card-header>

                  <ion-card-content>liters </ion-card-content>
                </ion-card>
              </IonCol>
              <IonCol size="6">
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>
                      <IonInput v-model="maxMileage"></IonInput>
                    </ion-card-title>
                    <ion-card-subtitle class="parameter-title"> Maximum Mileage </ion-card-subtitle>
                  </ion-card-header>

                  <ion-card-content> kilometers </ion-card-content>
                </ion-card>
              </IonCol>
            </IonRow>
            <IonRow>
              <ion-card style="margin-top: 2px">
                <ion-card-header>
                  <ion-card-title> <IonInput v-model="fuelPrice"></IonInput> </ion-card-title>
                  <ion-card-subtitle> Fuel Price </ion-card-subtitle>
                </ion-card-header>

                <ion-card-content> ₵ per liter </ion-card-content>
              </ion-card>
            </IonRow>
          </IonGrid>
        </div>
        <div class="centered">
          <ion-button color="medium" style="width: 50%" @click="clearData">Clear</ion-button>
          <ion-button style="width: 50%" @click="saveData">Save</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { pencilOutline, trashBinOutline } from "ionicons/icons";
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
import { ref, inject } from "vue";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonList, IonText, IonLabel, IonGrid, IonRow, IonCol, IonButton },
  setup() {
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

    const saveData = () => {
      StorageService.set("tankCapacity", tankCapacity.value);
      StorageService.set("maxMileage", maxMileage.value);
      fuelEfficiency.value = maxMileage.value / tankCapacity.value;
      StorageService.set("fuelEfficiency", fuelEfficiency.value);
      StorageService.set("fuelPrice", fuelPrice.value);
    };

    const clearData = async () => {
      tankCapacity.value = 0;
      maxMileage.value = 0;
      fuelEfficiency.value = 0;
      fuelPrice.value = 0;
    };

    loadData();

    return {
      pencilOutline,
      trashBinOutline,
      tankCapacity,
      maxMileage,
      fuelEfficiency,
      fuelPrice,
      loadData,
      saveData,
      clearData,
    };
  },
};
</script>

<style scoped>
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
  padding: 20px;
  height: 100%;
}

IonButtons {
  width: 100%;
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
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ion-input {
  border-bottom: 1px solid #ededed;
  width: 100%;
}
.parameter-title {
  min-height: 40px;
}

div {
  width: 100%;
}
</style>
