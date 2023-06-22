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

                  <ion-card-subtitle class="parameter-subtitle"> Tank Capacity </ion-card-subtitle>
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
                  <ion-card-subtitle class="parameter-subtitle"> Maximum Mileage </ion-card-subtitle>
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
          <IonRow>
            <IonButtons>
              <IonButton expand="full" @click="saveData"> Save </IonButton>
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

    loadData();

    return {
      pencilOutline,
      tankCapacity,
      maxMileage,
      fuelEfficiency,
      fuelPrice,
      loadData,
      saveData,
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
  min-height: 40px;
}
</style>
