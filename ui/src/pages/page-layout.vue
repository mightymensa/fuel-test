<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="calculator" href="/calculator">
          <ion-icon :icon="calculator" />
          <ion-label></ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon :icon="carSportOutline" />
          <ion-label></ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from "@ionic/vue";

import { calculator, carSportOutline } from "ionicons/icons";
</script>

<style scoped>
ion-tab-bar {
  /* --color: black; */
  --border: none;
  /* box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important; */
}
</style>
