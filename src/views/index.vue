<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="calculator" href="/calculator">
          <ion-icon :icon="calculator" />
          <ion-label>Calculator</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="config" href="/config">
          <ion-icon :icon="carSportOutline" />
          <ion-label>Configuration</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from "@ionic/vue";

import { playCircle, radio, library, search, calculator, carSportOutline } from "ionicons/icons";

export default {
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  data() {
    return {
      playCircle,
      radio,
      library,
      search,
      calculator,
      carSportOutline,
    };
  },
};
</script>

<style scoped>
ion-tab-bar {
  --color: black;
  --border: none;
  --background: transparent;
}
</style>
