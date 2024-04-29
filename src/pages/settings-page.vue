<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <div class="page-title">Settings</div>
        <IonButtons slot="primary">
          <IonButton href="/about">
            <FontAwesomeIcon slot="icon-only" icon="fa fa-circle-info" class="menu-icon"></FontAwesomeIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="container">
        <IonCard mode="ios">
          <IonCardContent>
            <div class="info-item">
              <div class="info-item-heading"><font-awesome-icon icon="fa-solid fa-fill-drip" />Tank Capacity</div>
              <div class="info-item-value text-lg">
                <div v-if="canEdit">
                  <input v-model="tankCapacity" placeholder="" id="tankCapacity" type="number" />
                  <span class="info-item-unit">liters</span>
                </div>
                <div v-else>{{ tankCapacity }}<span class="info-item-unit"> liters</span></div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-heading"><font-awesome-icon icon="fa-solid fa-road" />Maximum Mileage</div>
              <div class="info-item-value text-lg">
                <div v-if="canEdit">
                  <input v-model="maxMileage" placeholder="" id="maxMileage" type="number" />
                  <span class="info-item-unit">km</span>
                </div>
                <div v-else>{{ maxMileage }}<span class="info-item-unit"> km</span></div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-heading"><font-awesome-icon class="fc-blue" icon="fa-solid fa-gas-pump" />Fuel Price</div>
              <div class="info-item-value text-lg">
                <div v-if="canEdit">
                  <input v-model="fuelPrice" placeholder="" id="fuelPrice" type="number" />
                  <span class="info-item-unit">GH&cent;</span>
                </div>
                <div v-else>{{ fuelPrice }}<span class="info-item-unit"> GH&cent;</span></div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
        <div class="centered">
          <button class="btn btn-secondary m-5 w-50" @click="clearData">Clear</button>
          <button
            v-if="canEdit"
            id="save"
            :disabled="maxMileage <= 0 || tankCapacity <= 0 || fuelPrice <= 0"
            class="btn btn-primary m-5 w-50"
            @click="saveData"
          >
            Save
          </button>
          <button v-if="!canEdit" id="edit" class="btn btn-primary m-2 w-50" @click="editData">Edit</button>
          <!-- <IonToast class="ion-toast" trigger="save" message="Saved!" duration="3000" position="top" :icon="checkmarkCircleOutline"></IonToast> -->
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { checkmarkCircleOutline } from "ionicons/icons";
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonToast, IonButtons, IonButton } from "@ionic/vue";
import { ref, inject, onBeforeUpdate } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const StorageService = inject("StorageService") as {
  set: (key: string, value: number) => Promise<void>;
  get: (key: string) => Promise<any>;
  remove: (key: string) => Promise<void>;
};

const tankCapacity = ref();
const maxMileage = ref();
const fuelEfficiency = ref();
const fuelPrice = ref();

const canEdit = ref(false);

onBeforeUpdate(async () => {
  await loadData();
});

const loadData = async () => {
  tankCapacity.value = (await StorageService.get("tankCapacity")) || 0;
  maxMileage.value = (await StorageService.get("maxMileage")) || 0;
  fuelEfficiency.value = (await StorageService.get("fuelEfficiency")) || 0;
  fuelPrice.value = (await StorageService.get("fuelPrice")) || 0;
};

const editData = () => {
  canEdit.value = true;
};

const saveData = async () => {
  await StorageService.set("tankCapacity", tankCapacity.value);
  await StorageService.set("maxMileage", maxMileage.value);
  fuelEfficiency.value = maxMileage.value / tankCapacity.value;
  await StorageService.set("fuelEfficiency", fuelEfficiency.value);
  await StorageService.set("fuelPrice", fuelPrice.value);
  canEdit.value = false;
};

const clearData = async () => {
  tankCapacity.value = "";
  maxMileage.value = "";
  fuelEfficiency.value = "";
  fuelPrice.value = "";
};
</script>

<style scoped>
/* Element styles */

IonCard {
  margin-top: 5px;
  border-radius: 20px;
}
IonInput {
  /* border-bottom: 1px solid #ededed; */
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(27, 26, 26);
}
ion-item {
  width: 100%;
  padding: 5px;
  --padding-start: 2px;
}

/* Other styles */
.ion-toast {
  --border-color: rgb(0, 128, 0);
  --border-width: 50px;
  --font-weight: 600;
  --font-size: small;
  --color: rgb(16, 230, 16);
}

.container {
  width: 90%;
  max-width: 400px;
  margin: auto;
  /* padding: 20px; */
}

.centered {
  text-align: center;
  width: 300px;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: space-between;
}

.info-item:not(:first-child) {
  margin-top: 40px;
}
</style>
